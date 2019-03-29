import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { WELCOME_SCREEN, LANGUAGE_SCREEN, SIDE_DRAWER } from '../../navigation';

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
