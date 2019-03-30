import React from 'react';
import {
    View,
    //TouchableHighlight,
    //Image,
    Button
 } from 'react-native';

// TODO: SHould it be class????
class PlayButton extends React.Component {
    state = {
      // fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
      // spinValue: new Animated.Value(0)
    }

// TODO: Add LazyLoading!?
    componentDidMount() {

    }

    componentDidUpdate () {

    }

    onPlay = () => {

    }

    //<Image source={require('../../assets/icons/Play.png')}/>

    render() {

      return (
        <View>
            <Button
                title={this.props.playButtonTitle}
                disabled={this.props.playButtonDisabled}
                clicked={() => this.props.playPause()}/>
        </View>
      );
    }
  }


export default PlayButton
