import React, { Component } from 'react'
import ActionButton from 'react-native-action-button';
import { Linking, Alert, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


const linkWhatsapp = 'whatsapp://send?text=Bin%20awilel?&phone=+5219191333777'
              // ios option: https://wa.me/+5219191333777?text=Bin%20awilel?
const nameWA = "Whatsapp"

const linkFacebook = 'fb://page/656086031132404'
          // gral option: 'https://www.facebook.com/n/?achlequilcop'
const nameFB = "Facebook"

const linkSMS = Platform.OS === 'ios' ?
          'sms:+5219191333777&body=Bin Awilel!...' :
          'sms:+5219191333777?body=Bin Awilel!...'



class ShareButton extends Component {
  onPressSaludos(link, name) {
    Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
       Alert.alert(
         'Por favor instala ' + name + ' para mandar saludos'
       );
      } else {
       return Linking.openURL(link);
      }
    })
    .catch(err => console.error('An error occurred', err));
  }

  render () {
    return(
      <ActionButton buttonColor="rgba(61,206,88,0.79)">
        <ActionButton.Item buttonColor='#4AC25A' title="Whatsapp Cabina" onPress={() => this.onPressSaludos(linkWhatsapp, nameWA)}>
          <Icon name='whatsapp' size={30} color="white"/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#4469B0' title="Página Facebook" onPress={() => this.onPressSaludos(linkFacebook, nameFB)}>
          <Icon name='facebook-square' size={30} color="white"/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#9b59b6' title="SMS Cabina" onPress={() => this.onPressSaludos(linkSMS, "SMS")}>
          <Icon name='envelope' size={30} color="white"/>
        </ActionButton.Item>
      </ActionButton>
    )
  }
}


export default ShareButton
