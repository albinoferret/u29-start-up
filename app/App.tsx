import React from 'react'
import * as Expo from 'expo'
import { StyleSheet } from 'react-native'
import Amplify from 'aws-amplify'
import { withAuthenticator, SignIn, ConfirmSignIn, VerifyContact, SignUp, ConfirmSignUp, ForgotPassword } from 'aws-amplify-react-native'
import { Scene, Router, Actions, } from 'react-native-router-flux'
import awsExports from './aws-exports'
import { HomePage } from './src/pages/home/home.page'
import { MyFlashCardsPage } from './src/pages/myFlashCards/myFlashCards.page'
import { FlashCardDetailPage } from './src/pages/flashCardDetail/flashCardDetail.page'
import { DEFAULT_THEME as THEME } from './src/common/theme'
import { initData } from './src/data/init/initializer'

// 認証情報の設定
Amplify.configure(awsExports)

class App extends React.Component<any, any>{
  styles = StyleSheet.create({
    navBar: {
      backgroundColor: THEME.NAV_BAR_BG_COLOR,
    },
    title: {
      // right: Dimensions.get('window').width / 4,
      margin: "auto",
      // flex:1,
      fontFamily: 'normal',
      color: THEME.NAV_BAR_TITLE_COLOR,
      fontWeight: "300",
      fontSize: 20,
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  componentWillMount() {
    this.loadFonts()
    initData()
  }

  loadFonts = async () => {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Meiryo: require("./assets/fonts/Meiryo.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    })
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }
    return (
      <Router>
        <Scene key="root" navBarButtonColor='#ffffff' titleStyle={this.styles.title} navigationBarStyle={this.styles.navBar} >
          <Scene key="homePage" initial component={HomePage} title="メニュー" />
          <Scene key="myFlashCardsPage" component={MyFlashCardsPage} title="単語帳一覧" />
          <Scene key="flashCardDetailPage" component={FlashCardDetailPage} title="単語詳細" onBack={() => { Actions.myFlashCardsPage() }} back={true} />
        </Scene>
      </Router>
    )
  }
}

export default withAuthenticator(App, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
])
