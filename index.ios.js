
'use strict';
import DbConnector from './app/common/firebase-adapter/connection.js';
import LoginComp from './app/auth/login.ios';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class footballPlaner extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      connector: new DbConnector()
    }

  }
  componentDidMount() {
    this.state.connector.auth().then((cfg) => {
      this.setState({loggedIn: true});
    }).catch(err => console.error(err));
  }
  render() {
    let state = this.state;
    if (state.loggedIn) {
      console.log('state.connector.db', state.connector.db);
      return (
        <View>
          <LoginComp db={ state.connector.db }></LoginComp>
        </View>

      );
    } else {
      return (
        <View>
          <Text>Hello WOrkd</Text>
        </View>
      );
    }
  }
}
AppRegistry.registerComponent('footballPlaner', () => footballPlaner);
