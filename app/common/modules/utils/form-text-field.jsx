var iz = require('iz');

import MK, {
  MKColor,
  mdl
} from 'react-native-material-kit';

import React, {
  StyleSheet,
  Text,
  View,
  Component
} from 'react-native';
class Error extends Component{
  constructor(message){
    super(message);
    this.state = {message: this.props.message};
  }

  render(){
    return (
      <Text style={styles.error}>{this.state.message}</Text>
    );
  }
}
export default class TextFieldRecord extends Component {
  constructor(options = {value: '', placeHolder: ''}, id, onChange=null) {
    super(options, onChange);
    this.input = null;
    this.state = {
      options: options
    };
  }

  componentWillMount(){
    return this.setState({
      options: this.props.options,
      onChange: this.props.onChange,
      hasError: false,
      errorMessage: ''
    });
  }

  errorMessage(errors){
    let myMessage = '';
    errors.value.forEach((message) => {
      myMessage += `${message}\n`
    });
    return myMessage;
  }

  value(){
    return this.refs[this.props.id]._bufferedValue;
  }

  field(){
    return mdl.Textfield.textfieldWithFloatingLabel()
    .withFloatingLabelFont({
      fontSize: 18,
      fontWeight: "200"
    })
    .withDefaultValue(this.props.options.value)
    .withPlaceholder(this.props.options.placeHolder)
    .withStyle(styles.textfield)
    .withOnBlur(this.onChange.bind(this))
    .withHighlightColor(MKColor.BlueGrey)
    .build();
  }

  validate(){
    let rules = iz.are({
      value: this.props.options.rules
    });
    if (!rules.validFor({value: this.value()})) {
      this.setState({
        hasError: true,
        errorMessage: this.errorMessage(rules.getInvalidFields())
      });
      return false;
    }
    this.setState({
      hasError: false,
      errorMessage: ''
    });
    return true;
  }

  onChange(e) {
    console.log('this.ref', this.refs);
    if (this.state.onChange && this.validate()) {
      return this.state.onChange({value: this.value(), ref: this.props.id});
    }
  }

  render() {
    if (this.state.options) {
      let ColoredTextfield = this.field();
      if (!this.input) {
        this.input = ColoredTextfield;
      }
      // <Text style={[styles.error]}>{this.state.errorMessage}</Text>
      if (ColoredTextfield) {
        return (
          <View>
            <ColoredTextfield ref={this.props.id}></ColoredTextfield>
            <Error message={this.state.errorMessage} />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  textfield: {
    height: 45,  // have to do it on iOS
    marginTop: 22
  },
  error:{
    color: MKColor.Red
  },
  textfieldWithFloatingLabel: {
    height: 38,  // have to do it on iOS
    marginTop: 10,
  }
});