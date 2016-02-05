import LoginFormModel from './login-form-model';
import ActiveForm from './../common/modules/utils/active-form';

import MK, {
  MKButton,
  MKColor,
  mdl,
  MKCardStyles
} from 'react-native-material-kit';

import React, {
  StyleSheet,
  Text,
  Component,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  ActivityIndicatorIOS
} from 'react-native';

export default class LoginForm extends LoginFormModel {
  constructor(db) {
    super(db);
    this.options = this.attributes();
    this.state = {
      db: db,
      form: {
        fields: this.attributes(),
        events: this.events()
      }
    };
  }

  componentWillMount() {}

  render() {
    if (this.state.form) {
      let ColoredFab = MKButton.coloredFab().withStyle(styles.fab).build();
      return (
        <View style={ [styles.container] }>
          <View style={[MKCardStyles.card]}>
            <Image
              source={require('./../assets/images/soccer-3.png')}
              style={[
                MKCardStyles.image,
                styles.image
              ]}
            />
            <ActiveForm
              form={this.state.form}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={ styles.container } >
        <ActivityIndicatorIOS
          animating={true}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      </View>
    );
  }
}
let window = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonView:{
    marginTop: 30
  },
  image:{
    resizeMode: 'contain',
    width: window.width-60,
    maxHeight: 160,
    alignSelf: 'center',
    marginTop: -14
    // borderWidth: 1,
    // borderColor: MKColor.BlueGrey,
  },
  container: {
    flex: 1,
    marginBottom: window.height*0.1,
    padding: 30,
    marginTop: window.height*0.1
  },
  centering: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

