import React from 'react';
import { Animated, Text, View } from 'react-native';

class AnimatedLogo extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
      spinValue: new Animated.Value(0)
    }

    componentDidMount() {

    }



    render() {

        if (this.props.amimating) {
            console.log("Animating...");
            Animated.loop(Animated.timing(                  // Animate over time
              this.state.spinValue,            // The animated value to drive
              {
                toValue: 6,                   // Animate to opacity: 1 (opaque)
                duration: 5000,              // Make it take a while
                useNativeDriver: true
              }
            )                       // Starts the animation
        ).start();
    } else {
        console.log("Stop animating...");
        Animated.timing( this.state.spinValue ).stop()
    }

      //let { spinValue } = this.state;
      const spin = this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })

      return (
        <Animated.View                 // Special animatable View
          style={{
            ...this.props.style,
            //opacity: fadeAnim,         // Bind opacity to animated value
            transform: [{rotate: spin}]
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }


export default AnimatedLogo
