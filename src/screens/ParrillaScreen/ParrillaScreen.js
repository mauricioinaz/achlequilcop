import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';


class ParrillaScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parrillaLink: null,
      errorText: null
     };

    Navigation.events().bindComponent(this);
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

  componentDidMount() {
    this._getParrillaLink()
  }

  _getParrillaLink ()  {
    fetch("https://achlequilcop-atel.firebaseio.com/parrilla.json")
      .catch(err => {
        console.log("ERROR LOADING HORARIO: " + err);
        this.setState({parrillaLink: "error"})
      })
      .then(res => {
        return res.json()})
      .then( resJ => {
        this.setState({parrillaLink: resJ})
      })
  }

  ImageLoading_Error() {
    if (this.state.parrillaLink) {
      this.setState({errorText: 'No se pudo cargar el horario / Wohcol ta yilel'})
    }
  }

  render() {
    return (
      <View style={styles.flex}>
      <Text style={styles.errorText}>{this.state.errorText}</Text>
        <Image
          source={{uri: this.state.parrillaLink}}
          style={styles.image}
          onError={this.ImageLoading_Error.bind(this)}
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
  errorText: {
    fontSize: 24,
    paddingRight: 20,
    paddingLeft: 20
  }
});


export default ParrillaScreen;
