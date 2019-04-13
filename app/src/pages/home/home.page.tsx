import React from 'react';
import { Actions } from 'react-native-router-flux'
import { View, TouchableOpacity } from 'react-native';
import { Content, Icon, Text } from 'native-base';
import { DEFAULT_THEME } from '../../common/theme'
import { generateStyles } from './home.style'

export class HomePage extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      styles: generateStyles(DEFAULT_THEME)
    }
  }

  private goToMyFlashcardsPage = () => {
    Actions.myFlashCardsPage({ updateFlashCards: true })
  }

  render() {
    const styles = this.state.styles
    return (
      <Content padder>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuColumn} onPress={() => { this.goToMyFlashcardsPage() }}>
              <Icon type="MaterialCommunityIcons" name="cards" style={styles.menuIcon} />
              <Text style={styles.menuText}>MY単語帳</Text>
            </TouchableOpacity>
            <View style={styles.menuColumn}>
              <Icon type="MaterialCommunityIcons" name="dictionary" style={styles.menuIconInvalid} />
              <Text style={styles.menuTextInvalid}>辞書検索</Text>
            </View>
            <View style={styles.menuColumn}>
              <Icon type="FontAwesome" name="check-square-o" style={styles.menuIconInvalid} />
              <Text style={styles.menuTextInvalid}>テスト</Text>
            </View>
          </View>
          <View style={styles.menuRow}>
            <View style={styles.menuColumn}>
              <Icon type="MaterialCommunityIcons" name="settings" style={styles.menuIconInvalid} />
              <Text style={styles.menuTextInvalid}>設定</Text>
            </View>
            <View style={styles.menuColumn}>
              <Icon type="MaterialCommunityIcons" name="logout" style={styles.menuIconInvalid} />
              <Text style={styles.menuTextInvalid}>ログアウト</Text>
            </View>
            <View style={styles.menuColumn} />
          </View>
          <View style={styles.menuRow} />
        </View>
      </Content>
    )
  }
}
