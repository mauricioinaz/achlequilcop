import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import {
   CASTILLA,
   TSELTAL,
   SPANISH_DATA,
   TSELTAL_DATA,
   ONLY_WIFI,
   ALWAYS_CONNECTED,
   INTRO_1_CONFIG_LANGUAGE,
   INTRO_2_CONFIG_DATA,
   INTRO_3_WELCOME
 } from '../../redux/constants'
 import {connect} from 'react-redux';
 import Icon from 'react-native-vector-icons/FontAwesome'
 import * as actions from '../../redux/actions'
 import {
   widthPercentageToDP as wp
 } from 'react-native-responsive-screen';
 import ButtonAch from '../UI/ButtonAch/ButtonAch'

class Intro extends Component {

  state = {
    introStep: INTRO_1_CONFIG_LANGUAGE
  }

  handleSelectLang = (language) => {
    // if (language === CASTILLA) {
    //     this.props.onSpanishSelected()
    // } else if (language === TSELTAL) {
    //     this.props.onTseltalSelected()
    // }
    this.setState({introStep: INTRO_2_CONFIG_DATA})
  };

  handleSelectConnection = (connectionType) => {
    // if (connectionType === ONLY_WIFI) {
    //     this.props.onWifiSelected()
    // } else if (connectionType === ALWAYS_CONNECTED) {
    //     this.props.onAlwaysSelected()
    // }
    this.setState({introStep: INTRO_3_WELCOME})
  }

  render() {

    const introConfig = ((step) => {
      switch (step) {
        case INTRO_1_CONFIG_LANGUAGE:
          return (
            <View style={styles.ModalContainer}>
              <View style={styles.container}>
                <Text style={styles.introText}>
                  {SPANISH_DATA.config.langTitle + '/\n' +  TSELTAL_DATA.config.langTitle}
                </Text>
                <View style={styles.buttonsContainer}>
                  <View style={styles.selectedButton}>
                    <ButtonAch onPress={() => this.handleSelectLang(CASTILLA)}>{SPANISH_DATA.config.buttonSpanish}</ButtonAch>
                  </View>
                  <View style={styles.selectedButton}>
                    <ButtonAch onPress={() => this.handleSelectLang(TSELTAL)}>{TSELTAL_DATA.config.buttonTseltal}</ButtonAch>
                  </View>
                </View>
              </View>
            </View>
          )
        case INTRO_2_CONFIG_DATA:
          return (
            <View style={styles.ModalContainer}>
              <View style={styles.container}>
                <Text style={styles.introText}>
                  {this.props.dTitle}
                </Text>
                <View style={styles.buttonsContainer}>
                  <View style={styles.selectedButton}>
                    <ButtonAch onPress={() => this.handleSelectConnection(ONLY_WIFI)}>{this.props.bWifi}</ButtonAch>
                  </View>
                  <View style={styles.selectedButton}>
                    <ButtonAch onPress={() => this.handleSelectConnection(ALWAYS_CONNECTED)}>{this.props.bData}</ButtonAch>
                  </View>
                </View>
              </View>
            </View>
          )
        case INTRO_3_WELCOME:
          return(
            <View style={styles.ModalContainer}>
              <View style={styles.container}>
                <Text style={styles.introText}>{this.props.welcomeText}</Text>
              <View style={styles.buttonsContainer}>
                <View style={styles.selectedButton}>
                  <ButtonAch onPress={this.props.onHideModal}>
                    <Icon name='space-shuttle' size={30} color="white"/>
                  </ButtonAch>
                </View>
              </View>
            </View>
          </View>
        )
        default:

    }})(this.state.introStep)


    return introConfig;
  }
}


const styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    padding: 20
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 9,
    shadowColor: "#000",
    shadowRadius: 6.27,
    elevation: 15,
  },
  introText: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: wp('8%'),
    color: "#494D4B",
    textAlign: 'center',
  },
  buttonsContainer: {
    padding: 20
  }
});

const mapStateToProps = state => {
  return {
    currentLanguage: state.lang.language,
    dTitle: state.lang.languageData.config.dataTitle,
    bWifi: state.lang.languageData.config.buttonWifi,
    bData: state.lang.languageData.config.buttonData,
    confHeader: state.lang.languageData.drawer.configureHeader,
    welcomeText: state.lang.languageData.config.welcomeText
  };
}


const mapDispatchToProps = dispatch => {
  return {
    onWifiSelected: () => dispatch(actions.selectWifiOnly()),
    onAlwaysSelected: () => dispatch(actions.selectedAlwaysConnected()),
    onSpanishSelected: () => dispatch(actions.fetchSpanish()),
    onTseltalSelected: () => dispatch(actions.fetchTseltal()),
    onHideModal: () => dispatch(actions.hideModalIntro())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
