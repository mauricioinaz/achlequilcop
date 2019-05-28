import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import { sayTseltal } from '../../utility/sayTseltal/sayTseltal'
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';

class NumbersScreen extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nmb: '2',
        tseltalNumber: 'cheb'};
      Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({buttonId}) {
    if( buttonId == MENU_BTN_ID ){
      this.updateNavigationState();
    }
  }

  updateNavigationState(){
    Keyboard.dismiss()
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

  onTseltalNumbersHandler = (number) => {

    if (number){
      let result = ''

      try {
        result = sayTseltal(number)
      } catch(err) {
        this.setState({
          nmb: ""
        });
        Alert.alert(
          err.toString()
        );
      }

      this.setState({
        tseltalNumber: '' + result,
        nmb: number
      });
    } else {
      this.setState({
        tseltalNumber: '',
        nmb: number
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
          {this.props.numbTitle}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={number => this.onTseltalNumbersHandler(number)}
            value={this.state.nmb}
            placeholder="123..."
            keyboardType="numeric"
            returnKeyLabel="go"
            maxLength={8}
            autoFocus
            underlineColorAndroid23
          />
        </View>
        <View style={styles.resultContainer}>
          <Text
            numberOfLines={4}
            style={styles.result}>
          {this.state.tseltalNumber}
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'space-evenly',
  },
  titleContainer: {
    flex: .2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5
  },
  inputContainer: {
    flex: .3,
    justifyContent: "center",
    alignItems: "center"
  },
  resultContainer: {
    flex: .5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 28,
    color: "#494D4B",
    textAlign: 'center',
  },
  input: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 38,
    color: "#494D4B",
    textAlign: 'center',
  },
  result: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 38,
    color: "#000",
    textAlign: 'center',
  }
});

const mapStateToProps = state => {
  return {
    numbTitle: state.lang.languageData.numbers.numbersTitle,
  };
}

export default connect(mapStateToProps)(NumbersScreen);
