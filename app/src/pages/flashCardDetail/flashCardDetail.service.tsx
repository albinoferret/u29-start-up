import { FLASH_CARDS_SORT_TYPE, FLASH_CARDS_LIST_TYPE, FLAGMENT } from '../../common/types'
import FlashCard from '../../data/flashCard/dto'
import FlashCardDao from '../../data/flashCard/dao'
import JapaneseTranslationDao from '../../data/japaneseTranslation/dao'

export default class FlashCardDetailService {

  // 単語帳一覧を取得
  static getItems = (flashCardsListType: FLASH_CARDS_LIST_TYPE, flashCardsSortType: FLASH_CARDS_SORT_TYPE) => {
    return FlashCardDao.getAllItems().then((flashCards: Array<FlashCard>) => {
      switch (flashCardsListType) {
        case FLASH_CARDS_LIST_TYPE.NORMAL:
          flashCards = flashCards.filter((flashCard: FlashCard) => { return !flashCard.removedFlag })
          break
        case FLASH_CARDS_LIST_TYPE.BOOKMERKED:
          flashCards = flashCards.filter((flashCard: FlashCard) => { return flashCard.bookmarkedFlag })
          break
        case FLASH_CARDS_LIST_TYPE.REMOVED:
          flashCards = flashCards.filter((flashCard: FlashCard) => { return flashCard.removedFlag })
          break
        default:
          flashCards = flashCards.filter((flashCard: FlashCard) => { return !flashCard.removedFlag })
          break
      }
      switch (flashCardsSortType) {
        case FLASH_CARDS_SORT_TYPE.ASC:
          return flashCards.sort((a, b) => { return a.word > b.word ? 1 : 0 })
        case FLASH_CARDS_SORT_TYPE.DESC:
          return flashCards.sort((a, b) => { return b.word > a.word ? 1 : 0 })
        default:
          return flashCards.sort((a, b) => { return a.word > b.word ? 1 : 0 })
      }
    })
  }

  // 単語詳細を取得
  static getItemDetail = (word: string) => {
    // translationMasterからwordでひっかける。
    return JapaneseTranslationDao.getItem(word)
  }

  static setBookmarkedFlag = (targetFlashCard: FlashCard, flagment: FLAGMENT) => {
    return FlashCardDao.setBookmarkedFlag(targetFlashCard, flagment)
  }

  static setRemovedFlag = (targetFlashCard: FlashCard, flagment: FLAGMENT) => {
    return FlashCardDao.setRemovedFlag(targetFlashCard, flagment)
  }
}