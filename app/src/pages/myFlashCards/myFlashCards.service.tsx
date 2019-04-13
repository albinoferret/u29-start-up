import { FLASH_CARDS_SORT_TYPE } from "../../common/types"
import ConfigDao from "../../data/config/dao"
import FlashCard from "../../data/flashCard/dto"
import FlashCardDao from "../../data/flashCard/dao"

export default class MyFlashCardService {
  static getFlashCardsSortType = () => {
    return ConfigDao.getFlashCardsSortType()
      .then((ret: FLASH_CARDS_SORT_TYPE) => {
        return ret
      })
      .catch(error => {
        console.log(error)
        return FLASH_CARDS_SORT_TYPE.ASC
      })
  }

  static setFlashCardsSortType = (flashCardsSortType: FLASH_CARDS_SORT_TYPE) => {
    return ConfigDao.setFlashCardsSortType(flashCardsSortType)
  }

  // ソートタイプを指定して単語帳一覧を取得
  static getAllItems = (flashCardsSortType: FLASH_CARDS_SORT_TYPE) => {
    return FlashCardDao.getAllItems().then((ret: Array<FlashCard>) => {
      switch (flashCardsSortType) {
        case FLASH_CARDS_SORT_TYPE.ASC:
          return ret.sort((a, b) => {
            return a.word > b.word ? 1 : 0
          })
        case FLASH_CARDS_SORT_TYPE.DESC:
          return ret.sort((a, b) => {
            return b.word > a.word ? 1 : 0
          })
        default:
          return ret.sort((a, b) => {
            return a.word > b.word ? 1 : 0
          })
      }
    })
  }
}
