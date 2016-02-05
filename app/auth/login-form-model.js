import React, {
Component
} from 'react-native';

export default class LoginFormModel extends Component {

  constructor(db) {
    super(db);
  }

  rules() {
    return {
      'email': [
        {
          'rule': 'required',
          'error': 'Email darf nicht leer sein'
        },
        {
          'rule': 'email',
          'error': 'Email ist nicht gültig'
        }
      ],
      'password': [
        {
          'rule': 'between',
          'args': [5, 100],
          'error': 'Passwort muss min 5 Zeichen haben'
        }
      ]
    };
  }

  submit(form) {
    debugger;
    console.log(form);
  }

  events() {
    return {
      submit: this.submit.bind(this)
    }
  }
  attributes() {
    let rules = this.rules();
    return {
      email: {
        value: '',
        placeHolder: 'Ihre E-Mail',
        id: 'email',
        rules: rules.email
      },
      password: {
        value: '',
        placeHolder: 'Ihr Passwort',
        id: 'password',
        rules: rules.password
      }
    }
  }

  auth(email, password) {
    return this.db.authWithPassword().then((authData) => {
      console.log(authData);
    });
  }

  // onPress() {
  //   // call getValue() to get the values of the form
  //   debugger;
  //   let value = this.refs.loginForm.getValue();
  //   if (value) { // if validation fails, value will be null
  //     console.log(value); // value here is an instance of Person
  //   }
  // }
}