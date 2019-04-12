import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { sayTseltal } from '../../utility/sayTseltal/sayTseltal'


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class NumbersScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nmb: '2',
        tseltalNumber: 'cheb'};
      Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({buttonId}) {
      console.log('NAVIGATING... pressed');
      console.log(buttonId);
    if( buttonId == 'nav_btn' ){
      this.updateNavigationState();
    }
  }

  updateNavigationState(){
    Navigation.mergeOptions("sideMenu", {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

  onTseltalNumbersHandler = (number) => {
    let result = ''

    try {
      result = sayTseltal(this.state.nmb)
    } catch(err) {
      console.log("number error occurred");
      console.log(err);
      Alert.alert(
        err.toString()
      );
    }

    this.setState({
      tseltalNumber: '' + result
    });
  }

  render() {
    return (
      <View style={styles.flex}>
        <View>
          <TextInput
            onSubmitEditing={this.onTseltalNumbersHandler}
            onChangeText={number => this.setState({nmb: number})}
            value={this.state.nmb}
            placeholder="Escribe un número: 2"
            keyboardType="numeric"
            returnKeyLabel="go" //go, done, search
            maxLength={8}
          />
        </View>
        <View>
          <Text>{this.state.tseltalNumber}</Text>
        </View>
      </View>
    );
  }
}

export default NumbersScreen;
