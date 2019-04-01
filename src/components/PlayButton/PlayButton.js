import React, { Component } from 'react';
import {
    View,
    Button
 } from 'react-native';

 import {connect} from 'react-redux';
 import * as actions from '../../redux/actions'

// TODO: SHould it be class????
class PlayButton extends Component {

// // TODO: Add LazyLoading!?

    //<Image source={require('../../assets/icons/Play.png')}/>

    render() {

      return (
        <View>
            <Button
                title={this.props.playStopButton}
                disabled={this.props.playButtonDisabled}
                onPress={this.props.onTogglePlay}/>
        </View>
      );
    }
  }

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
