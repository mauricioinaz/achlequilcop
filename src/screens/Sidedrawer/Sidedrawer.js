import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import {
  LANGUAGE_SCREEN,
  SIDE_DRAWER,
  PARRILLA_SCREEN,
  ABOUT_SCREEN,
  NUMBERS_SCREEN,
  PLAY_BUTTON,
  MENU_BTN_ID,
  PLAY_BTN_ID,
  CENTER_STACK_ID,
  SIDE_DRAWER_ID
} from '../../navigation/Screens';
import { TSELTAL } from '../../redux/constants'
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';


class Sidedrawer extends Component {

  constructor (props) {
    super( props )
  }

  onRadioSelected () {
    Navigation.popToRoot(CENTER_STACK_ID)
    Navigation.mergeOptions(SIDE_DRAWER_ID, { sideMenu: { left: { visible: false, }}});
  }

  onScreenSelected (scr) {
    const title = (scr === LANGUAGE_SCREEN) ? this.props.confHeader :
                  (scr === PARRILLA_SCREEN) ? this.props.schedHeader :
                  (scr === ABOUT_SCREEN) ? this.props.abHeader :
                  (scr === NUMBERS_SCREEN) ? this.props.learnHeader : ''

    const titleLongFontSize = (scr === ABOUT_SCREEN) && (this.props.language === TSELTAL) ? wp('7%') : null

    Navigation.push(CENTER_STACK_ID, {
          component: {
            name: scr,
            options: {
              topBar: {
                title: {
                  text: title,
                  fontSize: titleLongFontSize,
                },
                leftButtons: [
                  {
                    id: MENU_BTN_ID,
                    icon: require('../../assets/icons/burgerMenu.png'),
                    color: 'white',
                  }
                ],
                rightButtons: [
                  {
                    id: PLAY_BTN_ID,
                    component: {
                        name: PLAY_BUTTON
                    },
                  }
                ],
              }
            }
          }
        });

    Navigation.mergeOptions(SIDE_DRAWER_ID, { sideMenu: { left: { visible: false, }}});
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.onRadioSelected}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIconRadio}
              source={require('../../assets/icons/LogoSinLetraMenu.png')}/>
            <Text style={[styles.menuText, {fontSize: wp('6%')}]}>Radio</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.spacer}><Text> </Text></View>

        <TouchableOpacity onPress={() => this.onScreenSelected(PARRILLA_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMaiz.png')}/>
              <Text style={styles.menuText}>{this.props.schedTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(NUMBERS_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMano.png')}/>
            <Text style={styles.menuText}>{this.props.learnTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(ABOUT_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoPersonas.png')}/>
            <Text style={styles.menuText}>{this.props.abTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(LANGUAGE_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoIdioma.png')}/>
            <Text style={styles.menuText}>{this.props.confTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
    }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white'
},
  menuElement: {
    flexDirection: 'row',
    margin: 10,
    marginLeft: 30,
    alignItems: 'center'
},
  menuIcon: {
    width: 48,
    height: 52,
    marginRight: 15,
    paddingLeft: 0
  },
  menuIconRadio: {
    marginTop: 10,
    width: 54,
    height: 64,
    marginRight: 15,
  },
  menuText: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: wp('5%')
  },
  spacer: {
    paddingBottom: 60
  }
});

// scheduleHeader: 'Horario',
// learningHeader: 'Aprende a Contar',
// aboutHeader: 'Acerca de',
// configureHeader: 'Elige un idioma'

const mapStateToProps = state => {
  return {
    schedTitle: state.lang.languageData.drawer.scheduleTitle,
    learnTitle: state.lang.languageData.drawer.learningTitle,
    abTitle: state.lang.languageData.drawer.aboutTitle,
    confTitle: state.lang.languageData.drawer.configureTitle,
    schedHeader: state.lang.languageData.drawer.scheduleHeader,
    learnHeader: state.lang.languageData.drawer.learningHeader,
    abHeader: state.lang.languageData.drawer.aboutHeader,
    confHeader: state.lang.languageData.drawer.configureHeader,
    language: state.lang.language
  };
}


export default connect(mapStateToProps)(Sidedrawer);
