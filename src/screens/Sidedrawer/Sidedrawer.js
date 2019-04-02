import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import {
    WELCOME_SCREEN,
    LANGUAGE_SCREEN,
    SIDE_DRAWER,
    PARRILLA_SCREEN,
    ABOUT_SCREEN,
    PLAY_BUTTON
} from '../../navigation';

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
  iconElement: {
      width: 40,
      height: 40,
      marginRight: 15
  },
  spacer: {
    paddingBottom: 60
  }
});

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
                      text: 'IDIOMA'
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
                          //icon: require('../assets/icons/Play.png'),
                          //text: "PLAY",
                          //color: 'white'
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
                      text: 'HORARIO'
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
                          //icon: require('../assets/icons/Play.png'),
                          //text: "PLAY",
                          //color: 'white'
                        }
                    ],
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
                      text: 'Sobre la Radio'
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
                          //icon: require('../assets/icons/Play.png'),
                          //text: "PLAY",
                          //color: 'white'
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
          <View style={styles.menuElement}>
              <Image
                  style={styles.iconElement}
                  source={require('../../assets/icons/LogoSinLetra.png')}/>
              <TouchableHighlight onPress={this.onRadioSelected}>
                  <Text>Radio</Text>
              </TouchableHighlight>
          </View>
          <View style={styles.spacer}><Text> </Text></View>
            <View style={styles.menuElement}>
                <Image
                    style={styles.iconElement}
                    source={require('../../assets/icons/IconoMaiz.png')}/>
                <TouchableHighlight onPress={this.onParrillaSelected}>
                    <Text>Horario</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.menuElement}>
                <Image
                    style={styles.iconElement}
                    source={require('../../assets/icons/IconoMano.png')}/>
                <TouchableHighlight>
                    <Text>Aprender</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.menuElement}>
                <Image
                    style={styles.iconElement}
                    source={require('../../assets/icons/IconoPersonas.png')}/>
                <TouchableHighlight onPress={this.onAboutSelected}>
                    <Text>Sobre la Radio</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.menuElement}>
                <Image
                    style={styles.iconElement}
                    source={require('../../assets/icons/IconoIdioma.png')}/>
                <TouchableHighlight onPress={this.onLanguageSelected}>
                    <Text>Configurar</Text>
                </TouchableHighlight>
            </View>
          </View>
        );
        }
}


// const mapStateToProps = state => {
//   return {
//
//   };
// }

export default Sidedrawer;
