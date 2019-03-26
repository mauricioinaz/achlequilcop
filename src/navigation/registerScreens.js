// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
  WelcomeScreen,
  LanguageScreen
} from '../screens';
import { Provider } from 'react-redux';

import {
  WELCOME_SCREEN,
  LANGUAGE_SCREEN,
  SINGLE_APP_SCREEN,
} from './Screens';
import configureStore from '../redux/configureStore';

const store = configureStore();

export default function () {   //WrappedComponent(WelcomeScreen)
    Navigation.registerComponentWithRedux(WELCOME_SCREEN, () => WelcomeScreen, Provider, store)
  //Navigation.registerComponent(WELCOME_SCREEN, () => WelcomeScreen)
  Navigation.registerComponentWithRedux(LANGUAGE_SCREEN, () => LanguageScreen, Provider, store)
  //Navigation.registerComponent(SINGLE_APP_SCREEN, () => SingleAppScreen);
  console.info('All screens have been registered...');
}
