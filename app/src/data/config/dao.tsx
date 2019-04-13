import { FLASH_CARDS_SORT_TYPE } from "../../common/types";
import { storage } from "../storage";
const KEY_NAME = "Config";

const CONFIG_TYPE = {
  FLASH_CARDS_SORT_TYPE: "flashCardsSortType"
};

export default class ConfigDao {
  static setFlashCardsSortType = (
    flashCardsSortType: FLASH_CARDS_SORT_TYPE
  ): Promise<void> => {
    console.log(flashCardsSortType);
    return storage
      .save({
        key: KEY_NAME, // Note: Do not use underscore("_") in key!
        id: CONFIG_TYPE.FLASH_CARDS_SORT_TYPE,
        data: flashCardsSortType,
        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600
      })
      .then(() => {
        // console.log(flashCardsSortType);
      });
  };

  static getFlashCardsSortType = (): Promise<FLASH_CARDS_SORT_TYPE> => {
    return storage
      .load({
        key: KEY_NAME,
        id: CONFIG_TYPE.FLASH_CARDS_SORT_TYPE
      })
      .then((flashCardsSortType: FLASH_CARDS_SORT_TYPE) => {
        // console.log(flashCardsSortType);
        return flashCardsSortType;
      })
      .catch((e: Error) => {
        //NotFoundError, ExpiredError
        throw e;
      });
  };
}
