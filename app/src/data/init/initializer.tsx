import { plainToClass } from "class-transformer"
import { FLASH_CARDS_SORT_TYPE } from "../../common/types"
import ConfigDao from "../config/dao"
import FlashCardDao from "../flashCard/dao"
import FlashCard from "../flashCard/dto"
import JapaneseTranslationDao from "../japaneseTranslation/dao"
import JapaneseTranslation from "../japaneseTranslation/dto"
import flashCards from "./scripts/flashCard.json"
import japaneseTranslations from "./scripts/japaneseTranslation.json"

export const initData = async () => {
    let flashCardArray: [FlashCard] = JSON.parse(JSON.stringify(flashCards.data))
    let results: Array<Promise<void>> = new Array<Promise<void>>()
    flashCardArray.map(async flashCard => {
        results.push(FlashCardDao.addItem(plainToClass(FlashCard, flashCard)))
    })
    await Promise.all(results)

    results = new Array<Promise<void>>()
    let japaneseTranslationArray: [JapaneseTranslation] = JSON.parse(JSON.stringify(japaneseTranslations.data))
    japaneseTranslationArray.map(japaneseTranslation => {
        results.push(JapaneseTranslationDao.addItem(plainToClass(JapaneseTranslation, japaneseTranslation)))
    })
    await Promise.all(results)

    ConfigDao.setFlashCardsSortType(FLASH_CARDS_SORT_TYPE.ASC)

    // FlashCardDao.getItems().then((results: Array<FlashCard>)=>{
    //     results.map((flashCard: FlashCard) => {console.log(flashCard)})
    // })
    // FlashCardDao.getItem('apple').then((ret: FlashCard)=>{
    //     console.log(ret)
    // }).catch((err: Error) => {})

    // JapaneseTranslationDao.getItem('apple').then((result: JapaneseTranslation)=>{
    //     console.log(result)
    // })
}
