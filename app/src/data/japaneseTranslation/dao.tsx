import JapaneseTranslation from './dto'
import {plainToClass} from "class-transformer"
import {storage} from '../storage'
const KEY_NAME = 'JapaneseTranslation'

export default class JapaneseTranslationDao {
    static addItem = (japaneseTranslation:JapaneseTranslation): Promise<void> => {
        return storage.save({
            key: KEY_NAME, // Note: Do not use underscore("_") in key!
            id: japaneseTranslation.word,
            data: japaneseTranslation,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
          }).then(()=>{
            // console.log(japaneseTranslation.word)
          })
    }

    static getItem = (word: string): Promise<JapaneseTranslation> => {
        return storage.load({
            key: KEY_NAME,
            id: word
          }).then((ret:JapaneseTranslation) => {
            return plainToClass(JapaneseTranslation, ret)
          }).catch((e:Error)=>{
            //NotFoundError, ExpiredError
            throw e
        })
    }

}