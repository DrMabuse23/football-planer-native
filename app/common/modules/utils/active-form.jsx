'use strict';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {
  StyleSheet,
  Component,
  ListView,
  View,
  Dimensions
} from 'react-native';

import MK, {
  MKButton,
  MKColor,
  mdl,
  MKCardStyles
} from 'react-native-material-kit';

import TextFieldRecord from './form-text-field';

export default class ActiveForm extends Component{

  constructor(form){
    super(form);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      onload: true
    };
  }

  row(field){
    return(
      <View style={styles.row}>
        <View style={styles.col}>
          <TextFieldRecord style={MKCardStyles.content} options={ field } id={field.id} onChange={this.itemChanged.bind(this)}/>
        </View>
      </View>
    );
  }

  submit() {
    return this.props.form.events.submit(this.props.form.fields);
  }

  componentWillMount(){
    let fields = this.props.form.fields;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(fields),
      onload: false
    });
  }

  itemChanged(field){
    let fields = this.props.form.fields;

    if (!field && !field.ref || field && !this.props.form.fields[field.ref]) {
      return false;
    }

    if (field.ref && fields[field.ref] === this.props.form.fields[field.ref]){
      return false;
    }

    fields[field.ref] = field;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(fields),
      onload: false
    });
  }

  render(){
    let ColoredFab = MKButton.coloredFab().build();
    let window = Dimensions.get('window');
    //style={{height: window.height*0.5}}
    return (
      <View>
        <ListView
          ref="form"
          dataSource={this.state.dataSource}
          renderRow={this.row.bind(this)}
        />
        <ColoredFab style={[MKCardStyles.action, styles.centering, styles.fab]} onPress={this.submit.bind(this)}>
          <Icon name="sign-in" size={20} color="white" />
        </ColoredFab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   col: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
  },
  fab:{
    width: 60,
    height: 60,
    margin: 20,
    // position: 'absolute',
    // bottom: -30,
    // right: -40,
    backgroundColor: MKColor.BlueGrey
  },
  centering: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});