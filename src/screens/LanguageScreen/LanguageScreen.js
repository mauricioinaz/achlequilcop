import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import ButtonAch from '../../components/UI/ButtonAch/ButtonAch'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions'
import {
  ONLY_WIFI,
  ALWAYS_CONNECTED,
  TSELTAL,
  CASTILLA
} from '../../redux/constants'
import {
  SIDE_MENU_ID,
  MENU_BTN_ID,
  CENTER_STACK_ID
} from '../../navigation/Screens';


class LanguageScreen extends Component {

  constructor(props) {
    super(props);
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

  componentDidUpdate(prevProps) {
   if(prevProps.confHeader !== this.props.confHeader) {
      Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            title: {
              text: this.props.confHeader
            },
          },
        })
    }
  }

  handleSelectLang = (language) => {

    if (language === CASTILLA) {
        this.props.onSpanishSelected()
        //selectedTseltal = (<Text>  </Text>)
        //selectedSpanish = (<Icon name='caret-left' size={30} color="#707070"/>)
    } else if (language === TSELTAL) {
        this.props.onTseltalSelected()
    }

    // only navigate at initial configuration
    //Navigation.popToRoot(this.props.componentId) //, {
  };

  handleSelectConnection = (connectionType) => {
    if (connectionType === ONLY_WIFI) {
        this.props.onWifiSelected()
        //selectedTseltal = (<Text>  </Text>)
        //selectedSpanish = (<Icon name='caret-left' size={30} color="#707070"/>)
    } else if (connectionType === ALWAYS_CONNECTED) {
        this.props.onAlwaysSelected()
        // TODO: Include Language options
        Alert.alert("El streaming sin Wifi podría consumir datos de tu saldo.")
    }
  }

  render() {
    const sel = (<Icon name='caret-left' size={30} color="#707070"/>)
    const notSel = (<Text>  </Text>)
    let selectedTseltal = sel
    let selectedSpanish = notSel
    let longTitleStyles = [styles.title, styles.titleLong]
    // TODO: could be better!?
    if (this.props.currentLanguage === CASTILLA) {
      selectedSpanish = sel
      selectedTseltal = notSel
      longTitleStyles.pop()
    }
    let selectedWifi = sel
    let selectedData = notSel
    if (!this.props.connectOnlyWifi) {
      selectedData = sel
      selectedWifi = notSel
    }


    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.lTitle}</Text>
          </View>
          <View style={styles.sectionConfigContainer}>
            <View style={styles.iconContainer}>
              <Icon name='comments' size={75} color="#707070"/></View>
            <View style={styles.buttonsContainer}>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleSelectLang(CASTILLA)}>{this.props.bSpanish}</ButtonAch>
                {selectedSpanish}
              </View>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleSelectLang(TSELTAL)}>{this.props.bTseltal}</ButtonAch>
                {selectedTseltal}
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: "100%",}}/>
        <View style={styles.sectionContainer}>
          <View allowFontScaling style={styles.titleContainer}>
            <Text style={longTitleStyles}>{this.props.dTitle}</Text>
          </View>
          <View style={styles.sectionConfigContainer}>
            <View style={styles.iconContainer}>
              <Icon name='wifi' size={70} color="#707070"/></View>
            <View style={styles.buttonsContainer}>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleSelectConnection(ONLY_WIFI)}>{this.props.bWifi}</ButtonAch>
                {selectedWifi}
              </View>
              <View style={styles.selectedButton}>
                <ButtonAch onPress={() => this.handleSelectConnection(ALWAYS_CONNECTED)}>{this.props.bData}</ButtonAch>
                {selectedData}
              </View>
            </View>
          </View>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  title: {
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: wp('8%'),
    color: "#494D4B",
    textAlign: 'center',
  },
  titleLong: {
    // TODO: Use specific fontSize for specific cases?
    fontSize: wp('6%'),
    paddingLeft: 15,
    paddingRight: 15
  },
  sectionConfigContainer: {
    height: "70%",
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30
  },
  sectionIcon: {
    width: 120,
    height: 120,
  },
  buttonsContainer: {
    width: "65%",
    padding: 20,
    paddingRight: 30,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});


const mapStateToProps = state => {
  return {
    currentLanguage: state.lang.language,
    connectOnlyWifi: state.lang.wifiOnly,
    lTitle: state.lang.languageData.config.langTitle,
    bSpanish: state.lang.languageData.config.buttonSpanish,
    bTseltal: state.lang.languageData.config.buttonTseltal,
    dTitle: state.lang.languageData.config.dataTitle,
    bWifi: state.lang.languageData.config.buttonWifi,
    bData: state.lang.languageData.config.buttonData,
    confHeader: state.lang.languageData.drawer.configureHeader,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    onSpanishSelected: () => dispatch(actions.fetchSpanish()),
    onTseltalSelected: () => dispatch(actions.fetchTseltal()),
    onWifiSelected: () => dispatch(actions.selectWifiOnly()),
    onAlwaysSelected: () => dispatch(actions.selectedAlwaysConnected()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
