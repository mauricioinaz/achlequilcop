import React from 'react'
import {Platform, TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native'

const buttonAch = props => {
  const insideButton = (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  )
  if (Platform.OS === 'android') {
    return(
      <TouchableNativeFeedback onPress={props.onPress}>
        {insideButton}
      </TouchableNativeFeedback>
    )
  }
  return(
    <TouchableOpacity onPress={props.onPress}>
      {insideButton}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#494D4B',
    backgroundColor: "#00678F"
  },
  buttonText: {
    color: 'white',
    fontFamily: 'UbuntuCondensed-Regular',
    fontSize: 18,
  }
});

export default buttonAch
