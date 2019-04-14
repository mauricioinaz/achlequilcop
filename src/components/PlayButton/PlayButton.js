import React, { Component } from 'react';
import {
    View,
    Image,
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
      <View style={styles.container}>
        <TouchableOpacity
          disabled={this.props.playButtonDisabled}
          onPress={this.props.onTogglePlay}
          style={styles.playButton}>
            {insideButton}
        </TouchableOpacity>
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
  playButton: {
    // TODO: ADJUST FOR IOS
    paddingRight: 5,
    paddingTop: 5,
    margin: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playImage: {
    //width: '50%',
    //height: '50%',
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
