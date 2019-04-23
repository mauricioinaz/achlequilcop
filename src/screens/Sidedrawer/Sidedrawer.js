import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  WELCOME_SCREEN,
  LANGUAGE_SCREEN,
  SIDE_DRAWER,
  PARRILLA_SCREEN,
  ABOUT_SCREEN,
  NUMBERS_SCREEN,
  PLAY_BUTTON
} from '../../navigation';


class Sidedrawer extends Component {

  constructor (props) {
    super( props )
  }

  onRadioSelected = () => {
    Navigation.popToRoot("CenterStack")
    Navigation.mergeOptions("settingsDrawer", { sideMenu: { left: { visible: false, }}});
  }

  onScreenSelected (scr) {

    const title = (scr === LANGUAGE_SCREEN) ? 'Elige un idioma' :
                  (scr === PARRILLA_SCREEN) ? 'Horario' :
                  (scr === ABOUT_SCREEN) ? 'Acerca de' :
                  (scr === NUMBERS_SCREEN) ? 'Aprende a Contar' : ''

    Navigation.push("CenterStack", {
          component: {
            name: scr,
            options: {
              topBar: {
                title: {
                  text: title
                  },
                  leftButtons: [
                    {
                      id: 'nav_btn',
                      icon: require('../../assets/icons/burgerMenu.png'),
                      color: 'white',
                    }
                  ],
                  rightButtons: [
                    {
                      id: 'nav_play_btn',
                      component: {
                          name: PLAY_BUTTON
                      },
                    }
                ],
              }
            }
          }
        });

    Navigation.mergeOptions("settingsDrawer", { sideMenu: { left: { visible: false, }}});
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.onRadioSelected}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIconRadio}
              source={require('../../assets/icons/LogoSinLetraMenu.png')}/>
            <Text style={[styles.menuText, {fontSize: 24}]}>Radio</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.spacer}><Text> </Text></View>

        <TouchableOpacity onPress={() => this.onScreenSelected(PARRILLA_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMaiz.png')}/>
              <Text style={styles.menuText}>Horario</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(NUMBERS_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMano.png')}/>
            <Text style={styles.menuText}>Aprender</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(ABOUT_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoPersonas.png')}/>
            <Text style={styles.menuText}>Sobre la Radio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onScreenSelected(LANGUAGE_SCREEN)}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoIdioma.png')}/>
            <Text style={styles.menuText}>Configurar</Text>
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
    fontSize: 20
  },
  spacer: {
    paddingBottom: 60
  }
});


export default Sidedrawer;
