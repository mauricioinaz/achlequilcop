import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Button
} from 'react-native';
import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';
import {connect} from 'react-redux';

// import { connectData } from 'src/redux';
//import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';

import MusicControl from 'react-native-music-control';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00678F'
  },
  button: {
    backgroundColor: '#039893'
  }
});

let strmAchLequilcop = "http://162.210.196.145:27582/"

class LanguageScreen extends Component {

        constructor() {
      super();
      this.state = {
      playPauseButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,

      error: null
    };
    }

        componentDidMount() {

              console.log('LOS CONTROLES?')
              MusicControl.setNowPlaying({
                  state: MusicControl.STATE_BUFFERING,
                  title: 'Radio',
                  artwork: 'https://xhbak.files.wordpress.com/2014/10/screen-shot-2014-10-09-at-11-07-46-pm.png', // URL or RN's image require()
                  artist: "Ach' Lequilc'op",
                  album: 'Thriller',
                  genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
                  duration: 294, // (Seconds)
                  description: 'Una descripción', // Android Only
                  color: 0xeeeeee, // Notification Color - Android Only
                  rating: 84, // Android Only (Boolean or Number depending on the type)
                  notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
                  })

              MusicControl.enableControl('play', true)
              MusicControl.enableControl('pause', true)
              MusicControl.enableControl('stop', true)
              MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
              MusicControl.enableControl('remoteVolume', false)

              MusicControl.on('play', () => {
                this._playPause()
            })

                MusicControl.on('pause', () => {
                  this._playPause()
              })

              MusicControl.on('stop', () => {
                this._stop()
            })
        }

      componentWillMount() {
        this.player = null;
        this.lastSeek = 0;

        this._reloadPlayer();
      }

      componentWillUnmount() {
        //console.log('unmount');
        // TODO
        //clearInterval(this._progressInterval);
      }

      _updateState(err) {

        const playState = (this.player && this.player.isPlaying) ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED
        MusicControl.updatePlayback({
          title: 'RadioPICADA',
          state: playState, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
          speed: 1, // Playback Rate
          volume: 10, // Android Only (Number from 0 to maxVolume) - Only used when remoteVolume is enabled
          maxVolume: 10, // Android Only (Number) - Only used when remoteVolume is enabled
          //rating: MusicControl.RATING_PERCENTAGE // Android Only (RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE)
        })

        this.setState({
          playPauseButton:      this.player    && this.player.isPlaying     ? 'PAUSA' : 'REPRODUCIR',

          stopButtonDisabled:   !this.player   || !this.player.canStop,
          playButtonDisabled:   !this.player   || !this.player.canPlay,
          recordButtonDisabled: (this.player         && !this.player.isStopped),
        });
      }

      _playPause() {

        this.player.playPause((err, playing) => {
          if (err) {
            this.setState({
              error: err.message
            });
          }
          this._updateState();
        });
      }

      _stop() {
        this.player.stop(() => {
          this._updateState();
        });
        //MusicControl.stopControl()
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
          } else {
            this.player.looping = this.state.loopButtonStatus;
          }

          this._updateState();
        });

        this._updateState();

        this.player.on('ended', () => {
          this._updateState();
        });
        this.player.on('pause', () => {
          this._updateState();
        });
      }
      //
      // onHandlerSigue = () => {
      //   const { getFacebookUserData, screenType } = this.props;
      //
      //   if (screenType === 'Single') {
      //     pushSingleScreenApp();
      //   } else {
      //     pushTabBasedApp();
      //   }
      // };



      render() {
        return (
          <View style={styles.mainContainer}>
            <Button
              title="BOTON"
              onPress={this.onHandlerSigue}
            />
            <Text>----LLEGAMOS---</Text>
            <Text>{this.props.status}</Text>
            <View>
              <View style={styles.buttonContainer}>
                <Button title={this.state.playPauseButton} disabled={this.state.playButtonDisabled} style={styles.button} onPress={() => this._playPause()}/>
                <Button title="DETENER" disabled={this.state.stopButtonDisabled} style={styles.button} onPress={() => this._stop()}/>
              </View>

              <View>
                <Text style={styles.errorMessage}>{this.state.error}</Text>
              </View>
            </View>
          </View>
        );
        }
}


const mapStateToProps = state => {
  return {
    status: state.lang.languageData
  };
}


export default connect(mapStateToProps)(LanguageScreen);
