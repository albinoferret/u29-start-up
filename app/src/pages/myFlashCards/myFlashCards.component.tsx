import React from "react"
import { Actions } from "react-native-router-flux"
import { TabHeading, Content, List, ListItem, Left, Right, Icon, Text } from "native-base"
import { DEFAULT_THEME } from "../../common/theme"
import { FLASH_CARDS_LIST_TYPE, FLASH_CARDS_SORT_TYPE } from "../../common/types"
import FlashCard from "../../data/flashCard/dto"

interface FlashCardsTabContentProps extends React.Props<{}> {
  flashCards: Array<FlashCard>
  flashCardsListType: FLASH_CARDS_LIST_TYPE
  flashCardsSortType: FLASH_CARDS_SORT_TYPE
}

export class FlashCardsTabContent extends React.Component<FlashCardsTabContentProps, any> {
  constructor(props) {
    super(props)
  }

  _goToFlashCardDetailPage = (selectedCardNumber: number) => {
    Actions.flashCardDetailPage({
      flashCardsListType: this.props.flashCardsListType,
      flashCardsSortType: this.props.flashCardsSortType,
      selectedCardNumber: selectedCardNumber
    })
  }
  render() {
    const { flashCards } = this.props
    return (
      <Content style={{ backgroundColor: DEFAULT_THEME.BODY_BG_COLOR }}>
        <List>
          {flashCards &&
            flashCards.map((flashCard: FlashCard, index: number) => {
              return (
                <ListItem
                  noIndent
                  key={index}
                  onPress={() => {
                    this._goToFlashCardDetailPage(index)
                  }}
                  style={{ backgroundColor: "#F5F5F5", borderBottomColor: "#C8C8C8", borderBottomWidth: 1 }}
                >
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>{flashCard.word}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )
            })}
        </List>
      </Content>
    )
  }
}

interface FlashCardsTabHeaderProps extends React.Props<{}> {
  title: string
  iconType:
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial"
  iconName: string
  filledIcon: boolean
}

export class FlashCardsTabHeader extends React.Component<FlashCardsTabHeaderProps, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, iconType, iconName, filledIcon } = this.props
    return (
      <React.Fragment>
        <Icon active={filledIcon} type={iconType} style={{ fontSize: 20 }} name={iconName} />
        <Text>{title}</Text>
      </React.Fragment>
    )
  }
}
