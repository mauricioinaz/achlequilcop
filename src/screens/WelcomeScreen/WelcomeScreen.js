import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Text,
  AsyncStorage,
  NetInfo,
  Modal
} from 'react-native';
import {
    Player
} from 'react-native-audio-toolkit';
import {connect} from 'react-redux';
import { Navigation } from 'react-native-navigation';
import RNExitApp from 'react-native-exit-app';
//import NetInfo from "@react-native-community/netinfo";
import * as actions from '../../redux/actions'
import AnimatedLogo from '../../components/AnimatedLogo/AnimatedLogo'
import ShareButton from '../../components/ShareButton/ShareButton';
import Intro from '../../components/Intro/Intro'
import MusicControl from 'react-native-music-control';
import {
  STOPPING,
  //ONLY_WIFI,
  ALWAYS_CONNECTED,
  TSELTAL,
  LANGUAGE_ASYNC,
  CONNECTION_ASYNC
} from '../../redux/constants'
import { SIDE_MENU_ID, MENU_BTN_ID } from '../../navigation/Screens';


class WelcomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playError: null,
      connection: null,
      refreshing: false,
      stream: "http://162.210.196.140:33094/" // ibero "http://noasrv.caster.fm:10182/live"
     };

    Navigation.events().bindComponent(this);
    NetInfo.addEventListener('connectionChange', this._handleConnectionChange);

    this.player = null;
    this._reloadPlayer();
  }

  navigationButtonPressed({buttonId}) {
    switch (buttonId) {
      case MENU_BTN_ID: {
        this.updateNavigationState();
        break;
      }
      default:
        break;
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
    this._getAsyncStorage()
    this._getStreamLink()
    this._setupMusicControl()
  }

  componentWillUnmount () {
    NetInfo.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.playToggle !== this.props.playToggle) {
      this._playStop()
    }
    if (prevProps.connectOnlyWifi !== this.props.connectOnlyWifi) {
      this._reloadPlayer()
    }
    if (prevState.stream !== this.state.stream) {
      console.log("Updating Stream");
      this._reloadPlayer()
    }
  }

  _getAsyncStorage = async () => {
    try {
      const valueLanguage = await AsyncStorage.getItem(LANGUAGE_ASYNC);
      const valueConnection = await AsyncStorage.getItem(CONNECTION_ASYNC);
      if (valueLanguage !== null) {

        if(valueLanguage === TSELTAL) { this.props.onTseltalSelected() }
      console.log("Language async loaded is:" + valueLanguage);
      } else {
        this.props.onShowModal()
      }
      if (valueConnection !== null) {
        if(valueConnection === ALWAYS_CONNECTED) { this.props.onAlwaysSelected() }
      console.log("Connection loaded is:" + valueConnection);
      } else {

      }
    } catch (error) {
      console.log('--->ERROR RETRIEVING ASYNC');
    }
  }

  _getStreamLink ()  {
    fetch("https://achlequilcop-atel.firebaseio.com/masterSheet.json")
      .catch(err => {
        console.log("ERROR DE SERV: " + err);
      })
      .then(res => {
        return res.json()})
      .then( resJ => {
        // TODO: if (resJ[0][0] === "STREAMING")
        this.setState({stream: resJ[0][1]})
      })
  }

  _handleConnectionChange = (data) => {
    console.log("type is: " + data.type);
    this.setState({ connection: data.type})
    if (data.type !== 'wifi' && this.props.connectOnlyWifi) {
      this._reloadPlayer()
    }
  };

  _onRefresh = () => {
    this.setState({ refreshing: true});
    this._reloadPlayer();
    setTimeout(() => {
      if (this.player && this.player.state === 1) {
        Alert.alert(this.props.errServer)
      }
    },5000)
  }

  _updateState(err) {

    let playState = null

    if (this.player && this.player.isPlaying) {
      this.props.onStopPlay()
      playState = MusicControl.STATE_PLAYING
    } else {
      this.props.onStartPlay()
      playState = MusicControl.STATE_PAUSED
    }
    if (!this.player || !this.player.canPlay) {
      playState = MusicControl.STATE_BUFFERING
      this.props.onDisablePlay()
    } else {
      this.props.onEnablePlay()
    }
    MusicControl.updatePlayback({
      title: 'Radio',
      state: playState, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      speed: 1, // Playback Rate
    })
  }

  _playStop() {
    if(!this.player.isPlaying) {
      this.player.play((err) => {
        if (err) {
          this.setState({
            playError: err.message
          });
        }
        this._updateState();
      });
    } else {
      //STOP
      this.player.stop(() => {
        this._updateState();
      });
      // TODO: verify if this reload generates problems
      this._reloadPlayer()
      MusicControl.stopControl()
    }
  }

  _reloadPlayer() {

    if (this.player) {
      this.player.destroy();
    }

    NetInfo.getConnectionInfo().then(data => {
      console.log("Connection type", data.type);

      if(data.type === 'wifi' || !this.props.connectOnlyWifi){
        this.player = new Player(this.state.stream, {
          autoDestroy: false,
          continuesToPlayInBackground: true,
          wakeLock: true
        }).prepare((err) => {
          if (err) {
            console.log('error at _reloadPlayer():');
            console.log(err);
            if (this.state.refreshing) {
              // TODO: Adjust to language
              Alert.alert(this.player.state + this.props.errStream + err)
            }
          }

          this._updateState();
        });

        this._setupMusicControl();

        // TODO: eliminate?
        this.player.on('ended', () => {
          this._updateState();
        });
      } else {
        if (this.state.refreshing) {
          // TODO: Adjust to language
          if (data.type === 'cellular' && this.props.connectOnlyWifi) {
            Alert.alert(this.props.errConn1)
          } else {
            Alert.alert(this.props.errConn2)
          }
        }
      }
      this.setState({refreshing: false});
    });

    this._updateState();
  }

  _setupMusicControl() {
    MusicControl.setNowPlaying({
      state: MusicControl.STATE_BUFFERING,
      title: 'Radio',
      artwork: 'https://xhbak.files.wordpress.com/2014/10/screen-shot-2014-10-09-at-11-07-46-pm.png', // URL or RN's image require()
      artist: "Ach' Lequilc'op",
      //album: 'Thriller',
      //genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      description: "Radio cu'untic", // Android Only
      color: 0xeeeeee, // Notification Color - Android Only
      notificationIcon: "AlC" //require('../../assets/icons/LogoSinLetraMenu.png'), // Android Only (String), Android Drawable resource name for a custom notification icon
    })

    // TODO: Check if functional in android
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);

    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', true)

    // TODO: Close APP on Swipe or WITH stop button???
    MusicControl.enableControl('closeNotification', true, {when: 'paused'})
    // TODO: Handle notifications
    MusicControl.on('closeNotification', ()=> {
      if (this.player) {
        // this.player.stop(() => {
        //   this._updateState();
        // });
        this.player.destroy();
        // TODO: Create a this.props.onInitialPlayingState()
        //this.props.onStartPlay()
      }
      MusicControl.stopControl()
      // TODO: App not exiting if in Background
      RNExitApp.exitApp();
      //BackHandler.exitApp()
      // change to when: 'pause' and
      // TODO: ¿Close app if in background for 24 and lower android?
      // do something like this.props.dispatch(onAudioEnd());
    })

    MusicControl.on('play', () => {
      this._playStop()
    })

    MusicControl.on('pause', () => {
      this._playStop()
    })

    // TODO: use X symbol instead of STOP
    MusicControl.on('stop', () => {
      if (this.player) {
        // this.player.stop(() => {
        //   this._updateState();
        // });
        this.player.destroy();
        // TODO: Create a this.props.onInitialPlayingState()
        // this.props.onStartPlay()
        // reload player?
      }
      MusicControl.stopControl()
      // TODO: App not exiting if in Background
      //BackHandler.exitApp()
      RNExitApp.exitApp();
    })
  }

  render() {
    //const conn = (this.props.connectOnlyWifi) ? ONLY_WIFI : ALWAYS_CONNECTED
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        contentContainerStyle={styles.mainContainer}
        overScrollMode='always'>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}>
            <Intro/>
        </Modal>
        <AnimatedLogo amimating={
          // TODO: check if screen is isVisible
          // ...   const isVisible = await this.props.navigator.screenIsCurrentlyVisible()
          this.props.playStopButton === STOPPING
        }/>
        <View>

          <View>
            <Text style={styles.errorMessage}>{/*this.state.playError*/}</Text>
          </View>
        </View>
        <ShareButton />
      </ScrollView>
    );
    }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  button: {
    backgroundColor: '#039893'
  },
  image: {
    width: 280,
    height: 280,
  },
  actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  shad: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});


const mapStateToProps = state => {
  return {
    langSelected: state.lang.language,
    connectOnlyWifi: state.lang.wifiOnly,
    playStopButton: state.play.playStopButton,
    playButtonDisabled: state.play.playButtonDisabled,
    playToggle: state.play.playToggle,
    modalVisible: state.lang.modalIntro,
    errServer: state.lang.languageData.errorMess.errorServer,
    errStream: state.lang.languageData.errorMess.errorStream,
    errConn1: state.lang.languageData.errorMess.errorConn1,
    errConn2: state.lang.languageData.errorMess.errorConn2
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //onSpanishSelected: () => dispatch(actions.fetchSpanish()),
    onTseltalSelected: () => dispatch(actions.fetchTseltal()),
    //onWifiSelected: () => dispatch(actions.selectWifiOnly()),
    onAlwaysSelected: () => dispatch(actions.selectedAlwaysConnected()),
    onStartPlay: () => dispatch(actions.startPlay()),
    onStopPlay: () => dispatch(actions.stopPlay()),
    onEnablePlay: () => dispatch(actions.enablePlay()),
    onDisablePlay: () => dispatch(actions.disablePlay()),
    onShowModal: () => dispatch(actions.showModalIntro())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
