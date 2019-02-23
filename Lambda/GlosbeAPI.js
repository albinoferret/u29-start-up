const axios = require('axios')

function GlosbeAPI (limitCount = 3) {
    this.url = ''
    this.limitCount = limitCount
}

GlosbeAPI.prototype.createURL = function (word) {
    if (!word.match(/^[A-Za-z].*$/i)) {
        console.log('Failed: ' + word + ' is not English word!')
        return false
    }
    this.url = 'https://ja.glosbe.com/gapi/translate?from=en&dest=ja&format=json&phrase=' + word + '&pretty=true'
}

GlosbeAPI.prototype.sendQuery = async function() {
    let meanings = []
    
    const data = await axios.get(this.url).then((response) => {
        return response.data
    }).catch((err) => {
        if (err) console.log(err)
    })
    
    if (data['result'] !== 'ok') {
        return false
    }
    
    let count = 0
    for (let index in data['tuc']) {
        let meaning = data['tuc'][index]['phrase']['text']

        if (count >= this.limitCount) 
            break
            
        if (!meaning)
            continue
        
        meanings.push(meaning)
        count++
    }
    
    return meanings
}

module.exports = GlosbeAPI