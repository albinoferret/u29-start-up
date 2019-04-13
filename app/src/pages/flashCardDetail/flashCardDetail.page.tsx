import React from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { Left, Right, Icon, Text, Badge, } from 'native-base';
import FlashCard from "../../data/flashCard/dto";
import JapaneseTranslation from '../../data/japaneseTranslation/dto'
import { FLAGMENT } from '../../common/types'
import { FLASH_CARDS_LIST_TYPE, FLASH_CARDS_SORT_TYPE } from '../../common/types'
import { DEFAULT_THEME } from '../../common/theme'
import { generateStyles } from '../myFlashCards/myFlashCards.style'
import FlashCardDetailService from './flashCardDetail.service'

interface Props extends React.Props<{}> {
  flashCardsListType: FLASH_CARDS_LIST_TYPE,
  flashCardsSortType: FLASH_CARDS_SORT_TYPE.ASC,
  selectedCardNumber: number
}

export class FlashCardDetailPage extends React.Component<Props, any>{
  constructor(props) {
    super(props)
    this.state = {
      styles: generateStyles(DEFAULT_THEME),
      japaneseTranslation: null,
      myFlashCards: [],
      selectedCardNumber: 0,
      selectedCardBookmarkedFlag: 0,
      selectedCardRemovedFlag: 0
    }
  }

  componentWillMount() {
    this._getFlashcards()
  }

  _getFlashcards = () => {
    FlashCardDetailService.getItems(this.props.flashCardsListType, this.props.flashCardsSortType)
      .then(async (flashCards: Array<FlashCard>) => {
        const selectedCard = flashCards[this.props.selectedCardNumber]
        const japaneseTranslation = await FlashCardDetailService.getItemDetail(selectedCard.word)
        this.setState({
          myFlashCards: flashCards,
          japaneseTranslation: japaneseTranslation,
          selectedCardNumber: this.props.selectedCardNumber,
          selectedCardBookmarkedFlag: selectedCard.bookmarkedFlag,
          selectedCardRemovedFlag: selectedCard.removedFlag
        })
      })
  }

  _showNextItem = () => {
    const nextNumber: number = (this.state.selectedCardNumber + 1) % this.state.myFlashCards.length
    const nextItem: FlashCard = this.state.myFlashCards[nextNumber]
    FlashCardDetailService.getItemDetail(nextItem.word)
      .then((japaneseTranslation: JapaneseTranslation) => {
        this.setState({
          japaneseTranslation: japaneseTranslation,
          selectedCardNumber: nextNumber,
          selectedCardBookmarkedFlag: nextItem.bookmarkedFlag,
          selectedCardRemovedFlag: nextItem.removedFlag
        })
      })
  }

  _showPrevItem = () => {
    const prevNumber: number = (this.state.selectedCardNumber - 1 + this.state.myFlashCards.length) % this.state.myFlashCards.length
    const prevItem: FlashCard = this.state.myFlashCards[prevNumber]
    FlashCardDetailService.getItemDetail(prevItem.word)
      .then((japaneseTranslation: JapaneseTranslation) => {
        this.setState({
          japaneseTranslation: japaneseTranslation,
          selectedCardNumber: prevNumber,
          selectedCardBookmarkedFlag: prevItem.bookmarkedFlag,
          selectedCardRemovedFlag: prevItem.removedFlag
        })
      })
  }

  _invertBookmarkedFlag = (flashCard: FlashCard) => {
    const newFlagment = this.state.selectedCardBookmarkedFlag === FLAGMENT.TRUE ? FLAGMENT.FALSE : FLAGMENT.TRUE
    FlashCardDetailService.setBookmarkedFlag(flashCard, newFlagment)
    this.setState({ selectedCardBookmarkedFlag: newFlagment })
  }

  _invertRemovedFlag = (flashCard: FlashCard) => {
    const newFlagment = this.state.selectedCardRemovedFlag === FLAGMENT.TRUE ? FLAGMENT.FALSE : FLAGMENT.TRUE
    FlashCardDetailService.setRemovedFlag(flashCard, newFlagment)
    this.setState({ selectedCardRemovedFlag: newFlagment })
  }

  render() {
    let flashCards: Array<FlashCard> = this.state.myFlashCards
    const deviceWidth = Dimensions.get("window").width
    const selectedCardNumber: number = this.state.selectedCardNumber
    return (
      flashCards && flashCards.length
        ? <View
          style={{ flexBasis: '100%', width: deviceWidth }}
        >
          <View style={{
            paddingHorizontal: 15,
            flexBasis: '10%',
            backgroundColor: DEFAULT_THEME.MODAL_CARD_HEADER_COLOR,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Left>
              <Text style={{ fontWeight: "bold", color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }}>{flashCards[selectedCardNumber].word}</Text>
            </Left>
            <Right style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <Badge style={{ backgroundColor: '#0C555D', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>{flashCards[selectedCardNumber].numOfTimesSearched + '回検索'}</Text>
              </Badge>
              <TouchableOpacity onPress={() => { this._invertBookmarkedFlag(flashCards[selectedCardNumber]) }}>
                {this.state.selectedCardBookmarkedFlag === FLAGMENT.TRUE
                  ? <Icon active type="MaterialCommunityIcons" name="bookmark-remove" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
                  : <Icon active type="MaterialCommunityIcons" name="bookmark-plus" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this._invertRemovedFlag(flashCards[selectedCardNumber]) }}>
                {this.state.selectedCardRemovedFlag === FLAGMENT.TRUE
                  ? <Icon active type="MaterialCommunityIcons" name="delete-restore" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
                  : <Icon active type="MaterialCommunityIcons" name="delete" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
                }
              </TouchableOpacity>
            </Right>
          </View>
          <ScrollView style={{
            flexBasis: '80%',
            backgroundColor: DEFAULT_THEME.MODAL_CARD_BODY_COLOR,
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}>
            {
              this.state.japaneseTranslation &&
              this.state.japaneseTranslation.translation.map((translation, index) => {
                return (
                  <Text key={index}>{translation}</Text>
                )
              })
            }
            <Text></Text>
          </ScrollView>
          <View style={{
            paddingHorizontal: 15,
            flexBasis: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: DEFAULT_THEME.MODAL_CARD_FOOTER_COLOR
          }}>
            <TouchableOpacity onPress={() => { this._showPrevItem() }}>
              <Icon type="FontAwesome" name="chevron-left" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this._showNextItem() }}>
              <Icon type="FontAwesome" name="chevron-right" style={{ fontSize: 25, color: DEFAULT_THEME.MODAL_CARD_ICON_COLOR }} />
            </TouchableOpacity>
          </View>
        </View>
        : <View />
    )
  }
}