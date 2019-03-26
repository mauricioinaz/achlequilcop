import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import {connect} from 'react-redux';
import * as actions from '../../redux/actions'

import { LANGUAGE_SCREEN } from '../../navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00678F',
    width: 250,
    marginTop: 30,
    borderRadius: 10
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class WelcomeScreen extends Component {

  handleGetStartAction = () => {
      this.props.onSpanishSelected()
      console.log('PICANDO?');
    Navigation.push(this.props.componentId, {
      component: {
        name: LANGUAGE_SCREEN,
        passProps: {
            text: 'se eligió Castilla'
        },
        options: {
          topBar: {
            title: {
              text: 'CASTILLA'
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.flex}>
        <Text>ARRANCAMOS</Text>
        <Button
          onPress={() => this.handleGetStartAction()}
          title="PÍCAME!"
          color='#00678F'
        />
        <Text>{this.props.status}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.lang.languageData
  };
}

const mapDispatchToProps = dispatch => {
    return {
        onSpanishSelected: () => dispatch(actions.fetchSpanish()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
