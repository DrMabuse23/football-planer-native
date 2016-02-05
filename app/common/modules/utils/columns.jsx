import React, {
  Component
} from 'react-native';
export default class Column extends Component{

  constructor(content){
    super(content);
  }

  render(){
    return(
      <View styles={styles.column}>
        {this.props.content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
   col: {
    flex: 1,
    flexDirection: 'column'
  }
});