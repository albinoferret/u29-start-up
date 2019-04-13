import Storage from 'react-native-storage';
import FlashCard from './dto'
import {plainToClass} from "class-transformer"
import {classToPlain} from "class-transformer";
import {storage} from '../storage'
import { ConsoleLogger } from '@aws-amplify/core';
import { FLAGMENT } from '../../common/types'
const KEY_NAME = 'FlashCard'


export default class FlashcardDao {
    static addItem = (flashCard:FlashCard): Promise<void> => {
        console.log(flashCard)
        return storage.save({
            key: KEY_NAME, // Note: Do not use underscore("_") in key!
            id: flashCard.word,
            data: flashCard,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
          }).then(()=>{
            // console.log(flashCard.word)
          })
    }

    static getItem = (word: string): Promise<FlashCard> => {
        return storage.load({
            key: KEY_NAME,
            id: word
          }).then((ret:FlashCard) => {
            //   console.log(ret)
            return plainToClass(FlashCard, ret)
          }).catch((e:Error)=>{
            //NotFoundError, ExpiredError
            throw e
        })
    }

    static getAllItems = ():Promise<Array<FlashCard>> => {
        return storage.getAllDataForKey(KEY_NAME).then((ret:Array<FlashCard>)=>{
            return plainToClass(FlashCard, ret)
        })
    }

    static getBookmarkedItems = ():Promise<Array<FlashCard>> => {
        return storage.getAllDataForKey(KEY_NAME).then((ret:Array<FlashCard>)=>{
            return plainToClass(FlashCard, ret).filter((flashCard:FlashCard)=>{return flashCard.bookmarkedFlag})
        })
    }

    static getRemovedItems = ():Promise<Array<FlashCard>> => {
        return storage.getAllDataForKey(KEY_NAME).then((ret:Array<FlashCard>)=>{
            return plainToClass(FlashCard, ret).filter((flashCard:FlashCard)=>{return flashCard.removedFlag})
        })
    }

    static setBookmarkedFlag = (targetFlashCard:FlashCard, flagment: FLAGMENT) => {
        let newCard:FlashCard = Object.assign({}, targetFlashCard)
        console.log(flagment)
        newCard.bookmarkedFlag = flagment
        //updatedAt       

        return storage.save({
            key: KEY_NAME, // Note: Do not use underscore("_") in key!
            id: targetFlashCard.word,
            data: newCard,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
          })
    }

    static setRemovedFlag = (targetFlashCard:FlashCard, flagment: FLAGMENT) => {
        let newCard:FlashCard = Object.assign({}, targetFlashCard)
        newCard.removedFlag = flagment
        //updatedAt

        return storage.save({
            key: KEY_NAME, // Note: Do not use underscore("_") in key!
            id: targetFlashCard.word,
            data: newCard,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
          })
    }

    static updateItem = (flashCard:FlashCard) => {
        return storage.save({
            key: KEY_NAME, // Note: Do not use underscore("_") in key!
            id: flashCard.word,
            data: {
                word: flashCard.word,
                bookmarkedFlag: flashCard.bookmarkedFlag,
                numOfTimesSearched: flashCard.numOfTimesSearched,
                removedFlag: flashCard.removedFlag ? 0 : 1,
                updatedAt: flashCard.updatedAt,
            },
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
          })
    }

}