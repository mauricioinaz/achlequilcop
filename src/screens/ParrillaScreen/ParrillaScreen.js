import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';


class ParrillaScreen extends Component {

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
      <View style={styles.flex}>
        <Image
          source={require('../../assets/images/Parrilla.png')}
          style={styles.image}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
});


export default ParrillaScreen;
