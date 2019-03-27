import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00678F'
  }
});

class Sidedrawer extends Component {

      onLanguageSelected = () => {
          console.log("push language navigation");
          // Navigation.push(this.props.componentId, {
          //       component: {
          //         name: LANGUAGE_SCREEN,
          //         passProps: {
          //             text: 'Elige un idioma'
          //         },
          //         options: {
          //           topBar: {
          //             title: {
          //               text: 'IDIOMA'
          //             }
          //           }
          //         }
          //       }
          //     });
      }

      render() {
        return (
          <View style={styles.mainContainer}>
            <Text>----MENU LATERAL (animate)---</Text>
            <Button title="Elige Idioma" onPress={this.onLanguageSelected} />
          </View>
        );
        }
}


const mapStateToProps = state => {
  return {

  };
}

export default Sidedrawer;
