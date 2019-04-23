import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import {connect} from 'react-redux';
 import * as actions from '../../redux/actions'
 import { STOPPING } from '../../redux/constants'


class PlayButton extends Component {

  render() {
    let insideButton = (<Image style={styles.playImage} source={require('../../assets/icons/Play.png')}/>)
    if (this.props.playButtonDisabled) {
      insideButton = (<Image style={[styles.playImage, styles.playImageDisabled]} source={require('../../assets/icons/Play.png')}/>)
    } else if(this.props.playStopButton === STOPPING) {
      insideButton = (<Image style={styles.pauseImage} source={require('../../assets/icons/Pause.png')}/>)
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={this.props.playButtonDisabled}
          onPress={this.props.onTogglePlay}
          style={styles.playButton}>
            <View style={styles.containerIcon}>{insideButton}</View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },
  containerIcon: {
    width: '100%',
    height: '100%',
    paddingRight: 40,
    paddingTop: 13,
  },
  playButton: {
    // TODO: ADJUST FOR IOS
    margin: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playImage: {
    width: 35,
    height: 35,
  },
  pauseImage: {
    width: 30,
    height: 38,
  },
  playImageDisabled: {
    tintColor: "rgba(255,255,255,0.34)"
  }
});


const mapStateToProps = state => {
  return {
    playStopButton: state.play.playStopButton,
    playButtonDisabled: state.play.playButtonDisabled,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    onTogglePlay: () => dispatch(actions.playToggle()),
    onTseltalSelected: () => dispatch(actions.fetchTseltal())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayButton)
