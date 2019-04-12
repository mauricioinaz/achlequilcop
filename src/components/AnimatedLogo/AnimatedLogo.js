import React from 'react';
import { Animated, Text, View } from 'react-native';

class AnimatedLogo extends React.Component {

  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    spinValue: new Animated.Value(0),
    sc: new Animated.Value(1),
    //opacity: 0
  }

  // TODO: Add LazyLoading!?
  componentDidMount() {

  }

  componentDidUpdate () {
    if (this.props.amimating) {
      // TODO: UNSET OPACITY ON ANIMATION
      //this.setState({opacity: 1})
      console.log("Animating...");
      Animated.loop(

        //   Animated.spring(                  // Animate over time
        //   this.state.spinValue,            // The animated value to drive
        //   {
        //     toValue: 1,                   // Animate to opacity: 1 (opaque)
        //     duration: 800,              // Make it take a while
        //     useNativeDriver: true
        //   }
        // )


        Animated.sequence([
          Animated.timing(                  // Animate over time
            this.state.sc,            // The animated value to drive
            {
              toValue: .85,                   // Animate to opacity: 1 (opaque)
              duration: 700,              // Make it take a while
              useNativeDriver: true
            }
          ),
          Animated.spring(                  // Animate over time
          this.state.sc,            // The animated value to drive
          {
            toValue: 1.1,                   // Animate to opacity: 1 (opaque)
            //duration: 500,              // Make it take a while
            friction: .3,  // menor es más sobretiro.
            tension: 20,   // más tensión más rápido
            //bounciness: 30,   // más grande, más brincador
            //speed: 5,
            useNativeDriver: true
          }
        )
        ])
    ).start();            // Starts the animation
    } else {
      // TODO: return smoothly to origin
      console.log("Stop animating...");
      // this.state.spinValue.stopAnimation()
      // this.state.spinValue.setValue(0)
      this.state.sc.stopAnimation()
      this.state.sc.setValue(1)
      //this.setState({opacity: 1})
    }
  }


  render() {

    //let { spinValue } = this.state;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1], // [0, .1, .2, .5, .8, 1],
      outputRange: ['0deg', '-90deg'] //['0deg', '20deg', '20deg', '40deg', '40deg' '0deg']
    })

    return (
      <Animated.Image                 // Special animatable View
        source={require('../../assets/icons/LogoSinLetra.png')}
        style={{
          ...this.props.style,
          width: 280,
          height: 280,
          //opacity: this.state.opacity,         // Bind opacity to animated value
          transform: [{scale: this.state.sc}],
          //transform: [{rotate: spin}]
        }}
        />
    );
  }
}


export default AnimatedLogo
