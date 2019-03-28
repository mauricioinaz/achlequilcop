import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import {connect} from 'react-redux';
import * as actions from '../../redux/actions'

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00678F',
    width: 250,
    marginTop: 30,
    borderRadius: 10
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class LanguageScreen extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        console.log('NAVIGATING... pressed');
        console.log(buttonId);
      if( buttonId == 'nav_btn' ){

        //(!this.sideDrawerVisible) ? this.sideDrawerVisible = true : this.sideDrawerVisible = false;
        this.updateNavigationState();
      }
    }

// TODO:
// BUG: needs to be clicked twice
updateNavigationState(){
   Navigation.mergeOptions("sideMenu", {
     sideMenu: {
       left: {
         visible: true
       }
     }
   });
 }

  handleGetStartAction = (language) => {

      if (language === "CASTELLANO") {
          this.props.onSpanishSelected()
      } else if (language === "TSELTAL") {
          this.props.onTseltalSelected()
      }

      // TODO: MODIFY PROPS AND TITLE
    Navigation.popToRoot(this.props.componentId) //, {
  };

  render() {
    return (
      <View style={styles.flex}>
        <Text>Elige tu idioma (meter logo)</Text>
        <Button
          onPress={() => this.handleGetStartAction("CASTELLANO")}
          title="CASTELLANO"
          color='#00678F'
        />
        <Button
          onPress={() => this.handleGetStartAction("TSELTAL")}
          title="BATS'IL C'OP"
          color='#00678F'
        />
        <Text>{this.props.previousLanguage}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    previousLanguage: state.lang.languageData
  };
}

const mapDispatchToProps = dispatch => {
    return {
        onSpanishSelected: () => dispatch(actions.fetchSpanish()),
        onTseltalSelected: () => dispatch(actions.fetchTseltal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
