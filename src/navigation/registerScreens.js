// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
  WelcomeScreen,
  LanguageScreen,
  Sidedrawer
} from '../screens';
import { Provider } from 'react-redux';

import {
  WELCOME_SCREEN,
  LANGUAGE_SCREEN,
  SIDE_DRAWER,
} from './Screens';
import configureStore from '../redux/configureStore';

const store = configureStore();

export default function () {
  Navigation.registerComponentWithRedux(WELCOME_SCREEN, () => WelcomeScreen, Provider, store)
  Navigation.registerComponentWithRedux(LANGUAGE_SCREEN, () => LanguageScreen, Provider, store),
  Navigation.registerComponent(SIDE_DRAWER, () => Sidedrawer),
  console.info('All screens have been registered...');
}
