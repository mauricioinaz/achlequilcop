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
import * as actions from '../../redux/actions'
import { Navigation } from 'react-native-navigation';
import AnimatedLogo from '../../components/AnimatedLogo/AnimatedLogo'
import ActionButton from 'react-native-action-button';
//import Icon from 'react-native-vector-icons/Ionicons';

//import MusicControl from 'react-native-music-control';

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
    // width: 250,
    // height: 280
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

let strmAchLequilcop = "http://162.210.196.145:27582/"

class WelcomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {playError: null};
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

// TODO:
// BUG: needs to be clicked twice
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

        //   MusicControl.setNowPlaying({
        //       state: MusicControl.STATE_BUFFERING,
        //       title: 'Radio',
        //       artwork: 'https://xhbak.files.wordpress.com/2014/10/screen-shot-2014-10-09-at-11-07-46-pm.png', // URL or RN's image require()
        //       artist: "Ach' Lequilc'op",
        //       album: 'Thriller',
        //       genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
        //       duration: 294, // (Seconds)
        //       description: 'Una descripción', // Android Only
        //       color: 0xeeeeee, // Notification Color - Android Only
        //       rating: 84, // Android Only (Boolean or Number depending on the type)
        //       notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
        //       })
        //
        //   MusicControl.enableControl('play', true)
        //   MusicControl.enableControl('pause', true)
        //   MusicControl.enableControl('stop', true)
        //   MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
        //   MusicControl.enableControl('remoteVolume', false)
        //
        //   MusicControl.on('play', () => {
        //     this._playStop()
        // })
        //
        //     MusicControl.on('pause', () => {
        //       this._playStop()
        //   })
        //
        //   MusicControl.on('stop', () => {
        //     this._stop()
        // })
    }

    componentWillMount() {
        this.player = null;

        this._reloadPlayer();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.playToggle !== this.props.playToggle) {
            this._playStop()
        }
    }

      _updateState(err) {

        // const playState = (this.player && this.player.isPlaying) ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED
        // MusicControl.updatePlayback({
        //   title: 'RadioPICADA',
        //   state: playState, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
        //   speed: 1, // Playback Rate
        //   volume: 10, // Android Only (Number from 0 to maxVolume) - Only used when remoteVolume is enabled
        //   maxVolume: 10, // Android Only (Number) - Only used when remoteVolume is enabled
        //   //rating: MusicControl.RATING_PERCENTAGE // Android Only (RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE)
        // })

        if (this.player && this.player.isPlaying) {
            this.props.onStopPlay()
        } else {
            this.props.onStartPlay()
        }
        if (!this.player || !this.player.canPlay) {
            this.props.onDisablePlay()
        } else {
            this.props.onEnablePlay()
        }
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
            //MusicControl.stopControl()
          }
      }

      _reloadPlayer() {
        if (this.player) {
          this.player.destroy();
        }

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

        this._updateState();

        this.player.on('ended', () => {
          this._updateState();
        });
        // TODO: eliminate?
        this.player.on('pause', () => {
          this._updateState();
        });
      }

      render() {
        return (
          <View style={styles.mainContainer}>
          <AnimatedLogo amimating={this.props.playStopButton === 'DETENER'}>
              <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.image}
              />
          </AnimatedLogo>
            <Text>{/*this.props.langSelected*/}</Text>
            <Text>{/*this.props.langData*/}</Text>
            <View>

              <View>
                <Text style={styles.errorMessage}>{this.state.playError}</Text>
              </View>
            </View>
            <ActionButton buttonColor="rgba(61,206,88,0.79)">
                <ActionButton.Item buttonColor='#9b59b6' title="Mensaje Whatsapp" onPress={() => console.log("notes tapped!")}>
                <Text>W</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Página Facebook" onPress={() => {}}>
                <Text>F</Text>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="SMS" onPress={() => {}}>
                <Text>SMS</Text>
                </ActionButton.Item>
            </ActionButton>
          </View>
        );
        }
}


const mapStateToProps = state => {
  return {
    langSelected: state.lang.language,
    langData: state.lang.languageData,
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
