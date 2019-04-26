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
    let result = ''

    try {
      result = sayTseltal(this.state.nmb)
    } catch(err) {
      this.setState({
        nmb: "2"
      });
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
            onSubmitEditing={this.onTseltalNumbersHandler}
            onChangeText={number => this.setState({nmb: number})}
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
          <Text style={styles.result}>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  resultContainer: {
    flex: 1.5,
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
