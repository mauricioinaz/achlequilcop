import { Navigation } from 'react-native-navigation';
import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  SIDE_DRAWER,
  PLAY_BUTTON
} from './Screens';
import registerScreens from './registerScreens';
import Icon from 'react-native-vector-icons/FontAwesome'


// Register all screens on launch
registerScreens();


export function pushInitialScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      animate: false,
      drawBehind: false,
      buttonColor: '#0B0F0D',
      background: {
          color: '#00678F'
      },
      topMargin: 22,
      title: {
        alignment: 'center',
        color: 'white',
        fontSize: 34,
        fontFamily: 'UbuntuCondensed-Regular'
      },
    },
    statusBar: {
      visible: true,
      drawBehind: true,
      style: 'light',
      backgroundColor: '#045E81',
    },
    layout: {
      orientation: ['portrait']
    },
    animations: {
      push: {
          enabled: 'false'
      },
      pop: {
          enabled: 'false'
        }
    }
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        id: "sideMenu",
        left: {
          component: {
            name: SIDE_DRAWER,
            id: 'settingsDrawer',
          }
        },
        center: {
          stack: {
            id: "CenterStack",
              children: [{
                component: {
                  name: WELCOME_SCREEN,
                  id: "WelcomeScreen",
                  options: {
                    topBar: {
                      title: {
                        text: "Ach' Lequilc'op"
                      },
                      leftButtons: [
                        {
                          id: 'nav_btn',
                          icon: require('../assets/icons/burgerMenu.png'),
                          //color: 'white',
                          //fontSize: 8
                        }
                      ],
                      rightButtons: [
                        {
                          id: 'nav_play_btn',
                          component: {
                              name: PLAY_BUTTON
                          },
                          fontSize: 12
                        }
                    ],
                    }
                  }
                },
              }]
            }
        }
      }
    }
  });
}
