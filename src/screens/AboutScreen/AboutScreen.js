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
  title: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 28
  },
  paragraph: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 18,
    textAlign: 'justify'
  },
  paragraphContainer: {
    padding: 30
  }
});

class AboutScreen extends Component {

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
        <Text style={styles.title}>Sobre nuestra radio:</Text>


        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph} numberOfLines={10}>Radio Ach’ Lequil C’op es una Radio comunitaria conformada por jóvenes Tseltales, Ch’oles y Mestizos. Además del equipo de base, somos más de 40 voluntarios elegidos por nuestras comunidades para brindar un servicio a nuestro pueblo..

          El proyecto ha sido hecho en colaboración con muchas organizaciones como la Ibero y el Iteso, estudiantes y maestros han aportado para tener un proyecto que brinde un servicio de gran calidad para mejorar las opciones comunicativas de la región.

          Para la solicitud del permiso, la radio reunió más de 8000 firmas de las comunidades con las que colaboramos. La radio, a través de los voluntarios, es del pueblo indígena de la región y está para fortalecer sus procesos sociales, culturales, educativos y organizativos-Las comunidades han sido acompañadas desde  1958 por la Misión de Bachajón, quien ha sido vínculo escencial para formar este proyecto.</Text>
        </View>
      </View>
    );
  }
}

export default AboutScreen;
