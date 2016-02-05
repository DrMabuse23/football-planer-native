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
    //'Email'
    this.state = {
      db: db,
      fields: {
        password:{
          value: '',
          placeHolder: 'Ihr Passwort',
          id: 'password'
        },
        email: {
          value: '',
          placeHolder: 'Ihre E-Mail',
          id: 'email'
        }
      }
    };
  }

  onSubmit(form) {
    debugger;
    console.log(form);
  }

  componentWillMount() {
    //this.ref.password = 'test';
    return this.setState({ form: this.shema() });
  }

  render() {
    let ColoredFab = MKButton.coloredFab().withStyle(styles.fab).build();
    let window = Dimensions.get('window');
    if (this.state.form) {
      return (
         <View style={ [styles.container] }>
          <View style={[MKCardStyles.card, {overflow: 'hidden', height: window.height*0.3}]}>
            <Image
              source={require('./../../../assets/images/soccer-10.png')}
              style={[
                MKCardStyles.image,
                {resizeMode: 'cover', width: 382}
              ]}
            />
            <ActiveForm
              fields={this.state.fields}
              onSubmit={this.onSubmit.bind(this)}
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

const styles = StyleSheet.create({
  buttonView:{
    marginTop: 30,
  },
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 44,
    backgroundColor: MKColor.BlueGrey
  },
  centering: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

