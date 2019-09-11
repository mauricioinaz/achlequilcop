import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import PhotoView from 'react-native-photo-view';
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';
import { COLORS, TSELTAL, FIREB } from '../../redux/constants'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class ParrillaScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parrillaLink: null,
      parrillaData: [],
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

    fetch("https://achlequilcop-atel.firebaseio.com/masterSheet.json")
      .catch(err => {
        console.log("ERROR DE SERV: " + err);
        this.setState({parrillaLink: "error"})
      })
      .then(res => {
        return res.json()})
      .then( resJ => {
        // TODO: if (resJ[0][0] === "PARRILLA")
        this.setState({parrillaLink: resJ[1][1], parrillaData: resJ})
        console.log(this.state.parrillaData);
        this._scrollView.flashScrollIndicators();
      })
  }

  ImageLoading_Error() {
    if (this.state.parrillaLink) {
      this.setState({errorText: "No se pudo cargar el horario / Ma' hu' ta chahpanel te sc'ahc'alel a'tel"})
    }
  }

  _setScrollView = scrollView => {
    this._scrollView = scrollView;
  };

  render() {

    const langNumb = (this.props.langSelected === TSELTAL) ? FIREB.tseltal : FIREB.spanish
    let showData = this.state.parrillaData.map((show, i) => {
      if (i < 3) return
      return (
        <View style={[styles.showCard, {backgroundColor: COLORS[show[FIREB.color]]}]} key={i}>
          <Text style={styles.cartTitle}>{show[FIREB.name]}</Text>
          <Text style={styles.cardData}>{show[langNumb]}</Text>
        </View>
      )
    })
    return (
      <View style={styles.flex}>
        <View style={styles.containerImage}>
          <Text style={styles.errorText}>{this.state.errorText}</Text>
          <View>
            <PhotoView
              source={{uri: this.state.parrillaLink}}
              minimumZoomScale={1}
              maximumZoomScale={3}
              androidScaleType="center"
              onLoad={() => console.log("Image loaded!")}
              style={{width: wp('95%'), height: hp('50%'), backgroundColor: '#fff'}} />
          </View>
        </View>
        <View style={styles.containerData}>
          <ScrollView
            ref={this._setScrollView}
            horizontal
            bounces
            directionalLockEnabled
            alwaysBounceHorizontal>
            {showData}
          </ScrollView>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  errorText: {
    fontSize: 24,
    paddingRight: 20,
    paddingLeft: 20
  },
  containerImage: {
    flex: .7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerData: {
    flex: .3,
  },
  showCard: {
    width: 150,
    height: "85%",
    borderColor: 'black',
    borderWidth: 1,
    margin: 8,
    padding: 5,
    borderRadius: 5,
    backgroundColor: COLORS.blue
  },
  cartTitle: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 18,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
    color: "white"
  },
  cardData: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 14,
    color: "#494D4B",
    textAlign: 'center',
    marginTop: 10,
    color: "white"
  }
});


const mapStateToProps = state => {
  return {
    langSelected: state.lang.language,
  };
}

export default connect(mapStateToProps)(ParrillaScreen);
