import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Button,
  AsyncStorage,
  Image
} from 'react-native';
import {
    Player
} from 'react-native-audio-toolkit';
import {connect} from 'react-redux';
import { Navigation } from 'react-native-navigation';
import NetInfo from "@react-native-community/netinfo";
import * as actions from '../../redux/actions'
import AnimatedLogo from '../../components/AnimatedLogo/AnimatedLogo'
import ShareButton from '../../components/ShareButton/ShareButton';
import MusicControl from 'react-native-music-control';


//let strmAchLequilcop = "http://noasrv.caster.fm:10182/live"
let strmAchLequilcop = "http://162.210.196.142:36923"

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = { playError: null };
    Navigation.events().bindComponent(this);

    // get async language
    // TODO: move to componentDidMount???
    this._getLanguage()

  }

  navigationButtonPressed({buttonId}) {
    switch (buttonId) {
      case 'nav_btn': {
        this.updateNavigationState();
        break;
      }
      default:
        break;
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

  _getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('ach:language');
      if (value !== null) {
      // We have data!!
      console.log("Language async loaded is:" + value);
      } else {
        Navigation.push(this.props.componentId, {
              component: {
                name: LANGUAGE_SCREEN,
                passProps: {
                    text: 'Elige un idioma'
                },
                options: {
                  topBar: {
                    title: {
                      text: 'IDIOMA'
                    }
                  }
                }
              }
        });
      }
    } catch (error) {
    // Error retrieving data
    }
  }

    // TODO: Move to constructor??
  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this._handleConnectionChange);


    // MusicControl.setNowPlaying({
    //   state: MusicControl.STATE_BUFFERING,
    //   title: 'Radio',
    //   artwork: 'https://xhbak.files.wordpress.com/2014/10/screen-shot-2014-10-09-at-11-07-46-pm.png', // URL or RN's image require()
    //   artist: "Ach' Lequilc'op",
    //   album: 'Thriller',
    //   genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
    //   duration: 294, // (Seconds)
    //   description: 'Una descripción', // Android Only
    //   color: 0xeeeeee, // Notification Color - Android Only
    //   rating: 84, // Android Only (Boolean or Number depending on the type)
    //   notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
    // })
    //
    // MusicControl.enableBackgroundMode(true);
    //
    // MusicControl.enableControl('play', true)
    // //MusicControl.enableControl('pause', true)
    // MusicControl.enableControl('stop', true)
    // //MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
    // //MusicControl.enableControl('remoteVolume', false)
    //
    // MusicControl.on('play', () => {
    //   this._playStop()
    // })
    //
    // MusicControl.on('pause', () => {
    //   this._playStop()
    // })
    //
    // // MusicControl.on('stop', () => {
    // //   this._playStop()
    // // })
  }

  componentWillMount() {
    this.player = null;

    this._reloadPlayer();
  }

  componentWillUnmount () {
    NetInfo.removeEventListener('connectionChange', this._handleConnectionChange);
    // TODO: Stop player???
  }

  componentDidUpdate(prevProps) {
    if(prevProps.playToggle !== this.props.playToggle) {
      this._playStop()
    }
    if (prevProps.connectOnlyWifi !== this.props.connectOnlyWifi) {
      this._reloadPlayer()
    }
  }

  _handleConnectionChange = (data) => {
    console.log("type is: " + data.type);
    if (data.type !== 'wifi' && this.props.connectOnlyWifi) {
      this._reloadPlayer()
    }

  };

  _updateState(err) {

    let playState = null //(this.player && this.player.isPlaying) ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED

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
      // TODO: ¿¿UPDATE TITLE??
      title: 'RadioPICADA',
      state: playState, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      speed: 1, // Playback Rate
      volume: 10, // Android Only (Number from 0 to maxVolume) - Only used when remoteVolume is enabled
      maxVolume: 10, // Android Only (Number) - Only used when remoteVolume is enabled
      //rating: MusicControl.RATING_PERCENTAGE // Android Only (RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE)
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
      console.log("Connection effective type", data.effectiveType);
      if(data.type === 'wifi' || !this.props.connectOnlyWifi){
        this.player = new Player(strmAchLequilcop, {
          autoDestroy: false,
          continuesToPlayInBackground: true
        }).prepare((err) => {
          if (err) {
            console.log('error at _reloadPlayer():');
            console.log(err);
          }

          this._updateState();
        });


        MusicControl.setNowPlaying({
          state: MusicControl.STATE_BUFFERING,
          title: 'Radio',
          artwork: 'https://xhbak.files.wordpress.com/2014/10/screen-shot-2014-10-09-at-11-07-46-pm.png', // URL or RN's image require()
          artist: "Ach' Lequilc'op",
          //album: 'Thriller',
          //genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
          //duration: 294, // (Seconds)
          description: "Radio cu'untic", // Android Only
          color: 0xeeeeee, // Notification Color - Android Only
          //rating: 84, // Android Only (Boolean or Number depending on the type)
          //notificationIcon: require('../../assets/icons/LogoSinLetraMenu.png'), // Android Only (String), Android Drawable resource name for a custom notification icon
        })

        MusicControl.enableBackgroundMode(true);

        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)

        // TODO: Close APP on Swipe or WITH stop button???
        MusicControl.enableControl('closeNotification', true, {when: 'paused'})
        // TODO: Handle notifications
        MusicControl.on('closeNotification', ()=> {
          // do something like this.props.dispatch(onAudioEnd());
        })


        MusicControl.on('play', () => {
          this._playStop()
        })

        MusicControl.on('pause', () => {
          this._playStop()
        })


        // TODO: eliminate?
        this.player.on('ended', () => {
          this._updateState();
        });
      }
    });

    this._updateState();


    // TODO: eliminate?
    // this.player.on('pause', () => {
    //   this._updateState();
    // });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      <AnimatedLogo amimating={this.props.playStopButton === 'DETENER'}/>
        <Text>{/*this.props.langSelected*/}</Text>
        <Text>{/*this.props.langData*/}</Text>
        <View>

          <View>
            <Text style={styles.errorMessage}>{this.state.playError}</Text>
          </View>
        </View>
        <ShareButton />
      </View>
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
    langData: state.lang.languageData,
    connectOnlyWifi: state.lang.wifiOnly,
    playStopButton: state.play.playStopButton,
    playButtonDisabled: state.play.playButtonDisabled,
    playToggle: state.play.playToggle
    // playError: state.play.playError,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onStartPlay: () => dispatch(actions.startPlay()),
    onStopPlay: () => dispatch(actions.stopPlay()),
    onEnablePlay: () => dispatch(actions.enablePlay()),
    onDisablePlay: () => dispatch(actions.disablePlay()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
