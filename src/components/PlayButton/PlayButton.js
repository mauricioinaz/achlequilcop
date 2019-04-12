import React, { Component } from 'react';
import {
    View,
    Button,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import {connect} from 'react-redux';
 import * as actions from '../../redux/actions'


class PlayButton extends Component {

  render() {
    let insideButton = (<Image style={styles.playImage} source={require('../../assets/icons/Play.png')}/>)
    if (this.props.playButtonDisabled) {
      insideButton = (<Image style={[styles.playImage, styles.playImageDisabled]} source={require('../../assets/icons/Play.png')}/>)
    } else if(this.props.playStopButton === "DETENER") {
      insideButton = (<Image style={styles.playImage} source={require('../../assets/icons/Pause.png')}/>)
    }

    return (
      <TouchableOpacity
        disabled={this.props.playButtonDisabled}
        onPress={this.props.onTogglePlay}
        style={styles.playButton}
        >
          {insideButton}
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  playButton: {
    // TODO: ADJUST TO NOT CROP IMAGE
    padding: 0,
    margin: 0
  },
  playImage: {
    width: 35,
    height: 35,
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
