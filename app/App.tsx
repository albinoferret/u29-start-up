import React from 'react';
import * as Expo from 'expo'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import { withAuthenticator, SignIn, ConfirmSignIn, VerifyContact, SignUp, ConfirmSignUp, ForgotPassword} from 'aws-amplify-react-native'
import awsExports from './aws-exports'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Card, CardItem, Badge } from 'native-base';

// 認証情報の設定
Amplify.configure(awsExports)

interface Flashcard {
  word: String
  translation: String
}

// ダミーのレスポンスを返すQuery
const QUERY_MY_FLASHCARDS = `query myFlashcards {
  myFlashcards {
    word
    translation
  }
}`

class App extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      myFlashcards: [],
      isReady: false
    }
  }

  componentWillMount() {
    this.loadFonts()
  }

  loadFonts = async () => {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    })
    this.setState({ isReady: true })
  }

  listFlashcards = async ()=> {
    const myFlashcards: any = await API.graphql(graphqlOperation(QUERY_MY_FLASHCARDS))
    this.setState({myFlashcards: myFlashcards.data.myFlashcards})
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }
    return (
      <Container>
        <Header>
          <Left>
            <Title>単語帳一覧</Title>
          </Left>
          <Right>
            <Button transparent onPress={this.listFlashcards}>
              <Icon type="FontAwesome" name="refresh"/>
            </Button>
          </Right>
        </Header>
        <Content padder>
        {
          this.state.myFlashcards && this.state.myFlashcards.map((flashcard: Flashcard, index: number)=> {
            return(
              <Card key={index}>
                <CardItem header bordered style={{justifyContent: "center"}}>
                  <Body>
                    <Text style={{fontWeight: "bold"}}>{flashcard.word}</Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{flashcard.translation}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Left>
                    <Button transparent primary>
                      <Icon active type="FontAwesome" name="tags" style={{fontSize: 20}}/>
                    </Button>
                  </Left>
                  <Right>
                    <Badge success>
                      <Text>6 回検索</Text>
                    </Badge>
                  </Right>
                </CardItem>
              </Card>
            )
          })
        }
        </Content>
      </Container>
    )
  }
}

export default withAuthenticator(App, true, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
])
