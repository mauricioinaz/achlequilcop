import React from 'react';
import { Navigation } from 'react-native-navigation';
import {
  WelcomeScreen,
  LanguageScreen,
  Sidedrawer,
  ParrillaScreen,
  AboutScreen,
  NumbersScreen
} from '../screens';
import PlayButton from '../components/PlayButton/PlayButton'
import { Provider } from 'react-redux';
import {
  WELCOME_SCREEN,
  LANGUAGE_SCREEN,
  SIDE_DRAWER,
  PARRILLA_SCREEN,
  ABOUT_SCREEN,
  NUMBERS_SCREEN,
  PLAY_BUTTON
} from './Screens';
import configureStore from '../redux/configureStore';


const store = configureStore();


export default function () {
  Navigation.registerComponentWithRedux(WELCOME_SCREEN, () => WelcomeScreen, Provider, store)
  Navigation.registerComponentWithRedux(LANGUAGE_SCREEN, () => LanguageScreen, Provider, store),
  Navigation.registerComponentWithRedux(PLAY_BUTTON, () => PlayButton, Provider, store),
  Navigation.registerComponent(SIDE_DRAWER, () => Sidedrawer),
  Navigation.registerComponent(PARRILLA_SCREEN, () => ParrillaScreen),
  Navigation.registerComponent(ABOUT_SCREEN, () => AboutScreen),
  Navigation.registerComponent(NUMBERS_SCREEN, () => NumbersScreen),

  console.info('All screens have been registered...');
}
