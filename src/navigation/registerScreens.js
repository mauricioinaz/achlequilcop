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

export default function () {
  Navigation.registerComponentWithRedux(WELCOME_SCREEN, () => WelcomeScreen, Provider, store)
  Navigation.registerComponentWithRedux(LANGUAGE_SCREEN, () => LanguageScreen, Provider, store)
  console.info('All screens have been registered...');
}
