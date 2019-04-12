import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';


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

class ParrillaScreen extends Component {

  constructor(props) {
      super(props);
      Navigation.events().bindComponent(this);
      // TODO: read PARRILLA image from external source
  }

  navigationButtonPressed({buttonId}) {
      console.log('NAVIGATING... pressed');
      console.log(buttonId);
    if( buttonId == 'nav_btn' ){
      this.updateNavigationState();
    }
  }

  updateNavigationState(){
    Navigation.mergeOptions("sideMenu", {
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

export default ParrillaScreen;
