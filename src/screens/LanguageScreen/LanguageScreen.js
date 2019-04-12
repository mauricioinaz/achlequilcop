import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Switch
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonAch from '../../components/UI/ButtonAch/ButtonAch'
import Icon from 'react-native-vector-icons/FontAwesome'

import {connect} from 'react-redux';
import * as actions from '../../redux/actions'

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 32,
    color: "#494D4B",
    textAlign: 'center',
  },
  sectionConfigContainer: {
    height: "70%",
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30
  },
  sectionIcon: {
    width: 120,
    height: 120,
  },
  buttonsContainer: {
    width: "70%",
    padding: 20,
    paddingRight: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
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
        selectedTseltal = (<Text>  </Text>)
        selectedSpanish = (<Icon name='caret-left' size={30} color="#707070"/>)
    } else if (language === "TSELTAL") {
        this.props.onTseltalSelected()
    }

      // TODO: MODIFY PROPS AND TITLE
    Navigation.popToRoot(this.props.componentId) //, {
  };

  render() {
    let selectedTseltal = (<Icon name='caret-left' size={30} color="#707070"/>)
    let selectedSpanish = (<Text>  </Text>)
    if (this.props.currentLanguage === "Cast") {
      selectedSpanish = (<Icon name='caret-left' size={30} color="#707070"/>)
      selectedTseltal = (<Text>  </Text>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Elige tu idioma</Text>
          </View>
          <View style={styles.sectionConfigContainer}>
            <View style={styles.iconContainer}>
              <Icon name='comments' size={80} color="#707070"/></View>
            <View style={styles.buttonsContainer}>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleGetStartAction("CASTELLANO")}>Castellano</ButtonAch>
                {selectedSpanish}
              </View>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleGetStartAction("TSELTAL")}>Bats'il C'op</ButtonAch>
                {selectedTseltal}
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: "100%",}}/>
        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{`Escucha la radio con\ntus datos o sólo en Wifi`}</Text>
          </View>
          <View style={styles.sectionConfigContainer}>
            <View style={styles.iconContainer}>
              <Icon name='wifi' size={75} color="#707070"/></View>
            <View style={styles.buttonsContainer}>
              <ButtonAch >Sólo WiFi</ButtonAch>
              <ButtonAch >Datos</ButtonAch>
            </View>
          </View>
        </View>
      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    currentLanguage: state.lang.languageData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSpanishSelected: () => dispatch(actions.fetchSpanish()),
    onTseltalSelected: () => dispatch(actions.fetchTseltal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
