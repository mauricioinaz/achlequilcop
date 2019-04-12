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

  onLanguageSelected = () => {
    Navigation.push("CenterStack", {
        component: {
          name: LANGUAGE_SCREEN,
          passProps: {
              text: 'Elige un idioma'
          },
          options: {
            topBar: {
              title: {
                text: 'Configurar'
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

  onParrillaSelected = () => {
    Navigation.push("CenterStack", {
          component: {
            name: PARRILLA_SCREEN,
            passProps: {
              text: '...'
            },
            options: {
              topBar: {
                title: {
                  text: 'Horario'
                  },
                  leftButtons: [{
                      id: 'nav_btn',
                      icon: require('../../assets/icons/burgerMenu.png'),
                      color: 'white',
                  }],
                  rightButtons: [{
                      id: 'nav_play_btn',
                      component: {
                          name: PLAY_BUTTON
                      },
                  }],
              }
            }
          }
        });

    Navigation.mergeOptions("settingsDrawer", { sideMenu: { left: { visible: false, }}});
  }

  onAboutSelected = () => {
    Navigation.push("CenterStack", {
          component: {
            name: ABOUT_SCREEN,
            passProps: {
                text: '...'
            },
            options: {
              topBar: {
                title: {
                  text: 'Acerca de'
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

  onNumbersSelected = () => {
    Navigation.push("CenterStack", {
          component: {
            name: NUMBERS_SCREEN,
            passProps: {
                text: '...'
            },
            options: {
              topBar: {
                title: {
                  text: 'Aprende a Contar'
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
              style={styles.menuIcon}
              source={require('../../assets/icons/LogoSinLetraMenu.png')}/>
            <Text style={styles.menuText}>Radio</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.spacer}><Text> </Text></View>

        <TouchableOpacity onPress={this.onParrillaSelected}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMaiz.png')}/>
              <Text style={styles.menuText}>Horario</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onNumbersSelected}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoMano.png')}/>
            <Text style={styles.menuText}>Aprender</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onAboutSelected}>
          <View style={styles.menuElement}>
            <Image
              style={styles.menuIcon}
              source={require('../../assets/icons/IconoPersonas.png')}/>
            <Text style={styles.menuText}>Sobre la Radio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onLanguageSelected}>
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
    height: 48,
    marginRight: 15,
  },
  menuText: {
    fontFamily: 'UbuntuCondensed-Regular'
  },
  spacer: {
    paddingBottom: 60
  }
});


export default Sidedrawer;
