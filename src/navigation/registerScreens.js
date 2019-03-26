// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import {
  WelcomeScreen,
  LanguageScreen
} from '../screens';
//import { Provider } from 'src/redux';

import {
  WELCOME_SCREEN,
  LANGUAGE_SCREEN,
  SINGLE_APP_SCREEN,
} from './Screens';


function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (

        <Provider>
          <Component
            {...props}
          />
        </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function () {   //WrappedComponent(WelcomeScreen)
  Navigation.registerComponent(WELCOME_SCREEN, () => WelcomeScreen)
  Navigation.registerComponent(LANGUAGE_SCREEN, () => LanguageScreen)
  //Navigation.registerComponent(SINGLE_APP_SCREEN, () => SingleAppScreen);
  console.info('All screens have been registered...');
}
