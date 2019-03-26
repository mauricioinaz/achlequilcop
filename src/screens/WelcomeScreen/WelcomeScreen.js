import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button
} from 'react-native';
//import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

import { LANGUAGE_SCREEN } from '../../navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00678F',
    width: 250,
    marginTop: 30,
    borderRadius: 10
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class WelcomeScreen extends Component {

  handleGetStartAction = () => {
      console.log('PICANDO?');
    Navigation.push(this.props.componentId, {
      component: {
        name: LANGUAGE_SCREEN,
        passProps: {
            text: 'se eligió Castilla'
        },
        options: {
          topBar: {
            title: {
              text: 'CASTILLA'
            }
          }
        }
      }
    });
  };

  // <Image
  //   style={styles.logo}
  //   source={require('assets/images/logo.png')}
  // />

  render() {
    return (
      <View style={styles.flex}>
        <Text>ARRANCAMOS</Text>
        <Button
          onPress={() => this.handleGetStartAction()}
          title="PÍCAME!"
          color='#00678F'
        />
      </View>
    );
  }
}

export default WelcomeScreen;
