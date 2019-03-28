import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import { WELCOME_SCREEN, LANGUAGE_SCREEN, SIDE_DRAWER } from '../../navigation';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00678F'
  }
});

class Sidedrawer extends Component {

    constructor (props) {
        super( props )

        //Inspirado de :
        //https://stackoverflow.com/questions/51944506/wix-react-native-navigation-v2-how-to-push-new-screen-to-current-screen-from-s
        Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
            console.log("Quien me picó es: " + componentId);
            // only spy on tabs we don't need other screens
            // if (componentId === 'searchScreen' || componentId === 'secondScreen') {
            //     this.setState({
            //         activeComponentId: componentId
            //     })
        })
    }

    onRadioSelected = () => {


        Navigation.popToRoot("CenterStack")
        // TODO:
        // BUG: DOES NOT CLOSE IN ANDROID!!
        // revisar:
        //https://github.com/wix/react-native-navigation/issues/4003
        Navigation.mergeOptions("sideMenu", { sideMenu: { left: { visible: false, }}});
    }

    onLanguageSelected = () => {
        // TODO:
        // BUG: DOES NOT CLOSE IN ANDROID!!
        Navigation.mergeOptions("sideMenu", { sideMenu: { left: { visible: false, }}});

        // TODO: Change for newRoot of stack? eliminate stack?
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
    }

      render() {
        return (
          <View style={styles.mainContainer}>
            <Text>----MENU LATERAL (animate)---</Text>
            <Button title="RADIO" onPress={this.onRadioSelected} />
            <Button title="Elige Idioma" onPress={this.onLanguageSelected} />
          </View>
        );
        }
}


const mapStateToProps = state => {
  return {

  };
}

export default Sidedrawer;
