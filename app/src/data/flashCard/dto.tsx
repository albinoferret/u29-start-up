export default class FlashCard {
    word: string
    numOfTimesSearched: number
    bookmarkedFlag: number
    removedFlag: number
    updatedAt: string

    constructor(word, numOfTimesSearched, bookmarkedFlag, removedFlag, updatedAt) {
        this.word = word
        this.numOfTimesSearched = numOfTimesSearched
        this.bookmarkedFlag = bookmarkedFlag
        this.removedFlag = removedFlag
        this.updatedAt = updatedAt
    }
}
