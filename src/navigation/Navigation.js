import { Navigation } from 'react-native-navigation';

import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();


export function pushInitialScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      animate: true,
      buttonColor: '#0B0F0D',
      background: {
          color: '#00678F'
      },
      borderColor: 'red',
      topMargin: 24,
    },
    statusBar: {
      visible: true,
      drawBehind: true,
      style: 'light',
      backgroundColor: '#0B0F0D'
    },
    layout: {
      orientation: ['portrait']
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysHide',
      backgroundColor: '#00678F'
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    }
  });

  Navigation.setRoot({
    root: {
        stack: {
            children: [{
                component: {
                  name: WELCOME_SCREEN
                }
            }]
        }
    }
  });
}

export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: SINGLE_APP_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'SINGLE SCREEN APP'
                },
                leftButtons: [
                  {
                    id: 'nav_user_btn',
                    //icon: require('assets/icons/ic_nav_user.png'),
                    color: 'white'
                  }
                ],
                rightButtons: [
                  {
                    id: 'nav_logout_btn',
                    //icon: require('assets/icons/ic_nav_logout.png'),
                    color: 'white'
                  }
                ]
              }
            }
          }
        }]
      }
    }
  });
}
