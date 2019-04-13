export default class JapaneseTranslation {
    word: string
    wordClass: string
    pronounceMark: string
    translation: [string]
    s3SoundPath: string

    constructor(word, wordClass, pronounceMark, translation, s3SoundPath) {
        this.word = word
        this.wordClass = wordClass
        this.pronounceMark = pronounceMark
        this.translation = translation
        this.s3SoundPath = s3SoundPath
    }
}
