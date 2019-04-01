import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
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
                      text: 'HORARIOS'
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
            <Text>----(logo)---</Text>
            <TouchableHighlight onPress={this.onRadioSelected}>
                <Text>RADIO</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.onLanguageSelected}>
                <Text>IDIOMA</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.onParrillaSelected}>
                <Text>PARRILLA</Text>
            </TouchableHighlight>
            <Text>___</Text>
            <TouchableHighlight onPress={this.onAboutSelected}>
                <Text>SOBRE LA RADIO</Text>
            </TouchableHighlight>
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
