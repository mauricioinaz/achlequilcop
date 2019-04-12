import React from 'react';
import { Animated, Text, View } from 'react-native';


class AnimatedLogo extends React.Component {

  state = {
    sc: new Animated.Value(1),
  }

  // TODO: Add LazyLoading!?

  componentDidUpdate () {
    if (this.props.amimating) {
      console.log("Animating...");
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            this.state.sc,
            {
              toValue: .85,
              duration: 700,
              useNativeDriver: true
            }
          ),
          Animated.spring(
          this.state.sc,
          {
            toValue: 1.1,
            friction: .3,  // more overshot
            tension: 20,   // faster
            useNativeDriver: true
          }
        )
        ])
      ).start();
    } else {
      console.log("Stop animating...");
      this.state.sc.stopAnimation()
      this.state.sc.setValue(1)
    }
  }

  render() {
    return (
      <Animated.Image
        source={require('../../assets/icons/LogoSinLetra.png')}
        style={{
          ...this.props.style,
          width: 280,
          height: 280,
          transform: [{scale: this.state.sc}],
        }}
      />
    );
  }
}


export default AnimatedLogo
