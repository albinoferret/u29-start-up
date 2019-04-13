import React from "react"
import { Tabs, Tab, TabHeading, Content } from "native-base"
import { FLASH_CARDS_LIST_TYPE, FLASH_CARDS_SORT_TYPE } from "../../common/types"
import { DEFAULT_THEME } from "../../common/theme"
import FlashCard from "../../data/flashCard/dto"
import MyFlashCardService from "./myFlashCards.service"
import { generateStyles } from "./myFlashCards.style"
import { FlashCardsTabHeader, FlashCardsTabContent } from "./myFlashCards.component"

export class MyFlashCardsPage extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      styles: generateStyles(DEFAULT_THEME),
      myFlashCards: [],
      flashCardsSortType: FLASH_CARDS_SORT_TYPE.ASC,
      flashCardsListType: FLASH_CARDS_LIST_TYPE.NORMAL
    }
  }

  componentWillMount() {
    // [TODO] appsync経由で翻訳データを取得
    // await this.importTranslations()
    this._getFlashCards()
  }

  importTranslations = () => {
    // [TODO] appsync経由で翻訳データを取得
    // const response:any = await API.graphql(graphqlOperation(QUERY_ALL_JAPANESE_TRANSLATIONS))
    // let japaneseTranslations: Array<JapaneseTranslation> = plainToClass(JapaneseTranslation, response.data.allJapaneseTranslations)
  }

  _getFlashCards = () => {
    MyFlashCardService.getFlashCardsSortType().then(async (flashCardsSortType: FLASH_CARDS_SORT_TYPE) => {
      const flashCards: Array<FlashCard> = await MyFlashCardService.getAllItems(this.state.flashCardsSortType)
      this.setState({
        flashCardsSortType: flashCardsSortType,
        myFlashCards: flashCards
      })
    })
  }

  render() {
    const flashCards: Array<FlashCard> = this.state.myFlashCards.filter((flashCard: FlashCard) => {
      return !flashCard.removedFlag
    })
    const bookmarkedCards = this.state.myFlashCards.filter((flashCard: FlashCard) => {
      return flashCard.bookmarkedFlag
    })
    const removedCards = this.state.myFlashCards.filter((flashCard: FlashCard) => {
      return flashCard.removedFlag
    })
    const flashCardsSortType = this.state.flashCardsSortType
    return (
      <Content>
        <Tabs initialPage={this.state.flashCardsListType}>
          <Tab heading={
            <TabHeading style={{ backgroundColor: DEFAULT_THEME.MODAL_CARD_HEADER_COLOR }}>
              <FlashCardsTabHeader title="一覧" iconType="FontAwesome" iconName="camera" filledIcon={false} />
            </TabHeading>
          }>
            <FlashCardsTabContent
              flashCards={flashCards}
              flashCardsListType={FLASH_CARDS_LIST_TYPE.NORMAL}
              flashCardsSortType={flashCardsSortType}
            />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: DEFAULT_THEME.MODAL_CARD_HEADER_COLOR }}>
              <FlashCardsTabHeader title="お気に入り" iconType="FontAwesome" iconName="star" filledIcon={true} />
            </TabHeading>
          }>
            <FlashCardsTabContent
              flashCards={bookmarkedCards}
              flashCardsListType={FLASH_CARDS_LIST_TYPE.BOOKMERKED}
              flashCardsSortType={flashCardsSortType}
            />
          </Tab>
          <Tab heading={
            <TabHeading style={{ backgroundColor: DEFAULT_THEME.MODAL_CARD_HEADER_COLOR }}>
              <FlashCardsTabHeader title="削除済み" iconType="AntDesign" iconName="delete" filledIcon={true} />
            </TabHeading>
          }>
            <FlashCardsTabContent
              flashCards={removedCards}
              flashCardsListType={FLASH_CARDS_LIST_TYPE.REMOVED}
              flashCardsSortType={flashCardsSortType}
            />
          </Tab>
        </Tabs>
      </Content>
    )
  }
}
