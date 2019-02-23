require('date-utils').ja

const AWS        = require('aws-sdk')
const GlosbeAPI  = require('GlosbeAPI')
const Treetagger = require('treetagger')
const s3         = new AWS.S3();

exports.handler = (event, context, callback) => {
    console.log("Info: Received event {}", JSON.stringify(event, 3))

    const myFlashcard = new MyFlashcard(event.field, event.arguments, event.identity)
    myFlashcard.main(callback)
}

function MyFlashcard (field, argument, identity) {
    this.field      = field
    this.argument   = argument
    this.identity   = identity
    this.bucketName = process.env['BUCKET_NAME']
    this.flashcard  = ''
    this.isUpdated  = false
}

MyFlashcard.prototype.main = async function(callback) {
    switch (this.field) {
        case 'listWords':
            callback(null, await this.getFlashcard(true))
            break
        case 'addWord':
            callback(null, await this.addWords())
            break
        default:
            callback("Unknown field, unable to resolve " + event.field, null)
            break
    }
}

MyFlashcard.prototype.getFlashcard = async function(bodyOnly = true) {
    console.log("Info: Got an Invoke getFlashcard().")

    const params = {
        Bucket: this.bucketName,
        Key: this.getObjectName()
    };

    let response = await s3.getObject(params, (err, data) => {
        if (err) console.log(err)
    }).promise().then((data) => {
        return JSON.parse(data.Body.toString()) || null
    });

    if (bodyOnly) {
        return response['flashcard']['body']
    }

    return response
}

MyFlashcard.prototype.addWords = async function () {
    console.log("Info: Got an Invoke addWords().")
    
    await this.setOrgFlashcard()
    await this.updateFlashcard()
    
    if (!this.isUpdated) {
        console.log('Info: There are no new words. So skip to add words to MyFlashcard')
        return this.flashcard
    }
    
    const params = {
        Body: JSON.stringify(this.flashcard),
        Bucket: this.bucketName,
        Key: this.getObjectName()
    }
    
    let response = await s3.putObject(params, function(err, data) {
        if (err) console.log(err)
    }).promise()
    
    if (!response['ETag']) {
        console.log('Failed: can not update flashCard!')
        return this.flashcard
    }
    
    return this.getFlashcard(false)
}

MyFlashcard.prototype.updateFlashcard = async function () {
    let glosbeAPI   = new GlosbeAPI()
    let newWords    = this.getNewWords()
    let updateCount = 0

    for (let index in newWords) {
        let newWord = newWords[index]
        
        if (!this.isNewWord(newWord)) {
            console.log('Info: \"' + newWord + '\" is already existed in flashCard.')
            continue
        }
        
        glosbeAPI.createURL(newWord)
        const meaning = await glosbeAPI.sendQuery()
        
        this.flashcard['flashcard']['body'].push({
            word: newWord,
            meaning: meaning
        })
        updateCount++
    }
    
    if (updateCount > 0) {
        this.flashcard['flashcard']['headers']['updateAt'] = this.getDatetime()
        this.isUpdated = true
    }
}

MyFlashcard.prototype.isNewWord = function(newWord) {
    const words = this.flashcard['flashcard']['body']
    for (let index in words) {
        if (newWord === words[index]['word']) {
            return false
        }
    }
    return true
}

MyFlashcard.prototype.setOrgFlashcard = async function () {
    if (this.flashcard !== '') {
        console.log('Waning: this.flashcard was already setted.')
        return false
    }
    this.flashcard = await this.getFlashcard(false)
}

MyFlashcard.prototype.getObjectName = function () {
    return process.env['CARDS_DIR'] + this.identity['username'] + "-flashcard.json"
}

MyFlashcard.prototype.getNewWords = function () {
    return this.argument['words']
}

MyFlashcard.prototype.getDatetime = function () {
    return new Date().toFormat('YYYY/MM/DD/ HH24:MI:SS')
}
