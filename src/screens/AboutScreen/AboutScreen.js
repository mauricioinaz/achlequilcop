import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';


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


  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.mainContainer}>
        <Text style={styles.title}>{this.props.abTitle}</Text>
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>{this.props.abInfo}</Text>
          <Text>---------------</Text>
          <Text style={styles.paragraph}>{this.props.abAck}</Text>
          <Text>---------------</Text>
          <Text style={styles.paragraph}>{this.props.abInfo}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48
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
    textAlign: 'justify',
    color: 'black',
    textAlign: 'justify'
  },
  paragraphContainer: {
    padding: 30
  }
});


const mapStateToProps = state => {
  return {
    abTitle: state.lang.languageData.about.aboutTitle,
    abInfo: state.lang.languageData.about.aboutInfo,
    abAck: state.lang.languageData.about.aboutAck
  };
}

export default connect(mapStateToProps)(AboutScreen);
