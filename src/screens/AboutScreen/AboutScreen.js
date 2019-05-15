import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  Linking
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';
import { COLORS } from '../../redux/constants'


const licenceURL = "https://github.com/mauricioinaz/achlequilcop/blob/devel/licences.json"
const radioURL = "https://www.achlequilcop.org"
const codeURL = "https://github.com/mauricioinaz/achlequilcop"

class AboutScreen extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    // TODO: read PARRILLA image from external source
  }

  navigationButtonPressed({buttonId}) {
    if( buttonId == MENU_BTN_ID ){
      this.updateNavigationState();
    }
  }

  updateNavigationState(){
    Navigation.mergeOptions(SIDE_MENU_ID, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

  clickLink(urlLink) {
    Linking.canOpenURL(urlLink).then(supported => {
      if (supported) {
        Linking.openURL(urlLink);
      } else {
        console.log("Don't know how to open URI: " + urlLink);
      }
    });
  }

  render() {

    //https://github.com/mauricioinaz/achlequilcop/blob/devel/licences.json

    return (
      <ScrollView
        contentContainerStyle={styles.mainContainer}>
        <Text style={styles.title}>{this.props.abTitle}</Text>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>{this.props.abInfo}</Text>
          <TouchableNativeFeedback
            onPress={() => this.clickLink(radioURL)}>
            <Text style={[styles.paragraph, {color: COLORS.blue}]}>achlequilcop.org</Text>
          </TouchableNativeFeedback>
          <Text> </Text>
          <Text style={styles.paragraph}>{this.props.abApp}</Text>
          <Text> </Text>
          <TouchableNativeFeedback
            onPress={() => this.clickLink(codeURL)}>
            <Text style={[styles.paragraph, {color: COLORS.blue}]}>{this.props.abVersion}</Text>
          </TouchableNativeFeedback>
          <Text> </Text>
          <Text style={styles.paragraph}>{this.props.abAck}</Text>
          <Text> </Text>
          <TouchableNativeFeedback
            onPress={() => this.clickLink(licenceURL)}>
            <Text style={[styles.paragraph, {color: COLORS.blue}]}>Licencias y Dependencias</Text>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
  },
  title: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 28,
    color: 'black',
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center'
  },
  paragraph: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    paddingBottom: 10
  },
  paragraphContainer: {
    padding: 30
  },
  closeButton: {
    textAlign: 'center',
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 28,
    padding: 10,
    color: COLORS.blue
  }
});


const mapStateToProps = state => {
  return {
    abTitle: state.lang.languageData.about.aboutTitle,
    abInfo: state.lang.languageData.about.aboutInfo,
    abApp: state.lang.languageData.about.aboutApp,
    abVersion: state.lang.languageData.about.appVersion,
    abAck: state.lang.languageData.about.aboutAck
  };
}

export default connect(mapStateToProps)(AboutScreen);
