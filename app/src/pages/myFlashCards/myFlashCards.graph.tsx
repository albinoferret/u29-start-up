// ダミーのレスポンスを返すQuery
export const QUERY_MY_FLASHCARDS = `query GetMyWords {
    myWords {
      word
      numOfTimesSearched
      createdAt
      updatedAt
    }
  }`

export const QUERY_ALL_JAPANESE_TRANSLATIONS = `query GetAllJapaneseTranslations {
    allJapaneseTranslations {
      word
      translation
      createdAt
      updatedAt
    }
  }
  `