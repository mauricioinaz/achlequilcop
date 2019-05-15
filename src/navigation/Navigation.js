import { Navigation } from 'react-native-navigation';
import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  SIDE_DRAWER,
  PLAY_BUTTON,
  SIDE_MENU_ID,
  MENU_BTN_ID,
  PLAY_BTN_ID,
  CENTER_STACK_ID,
  SIDE_DRAWER_ID,
  WELCOME_SCREEN_ID
} from './Screens';
import registerScreens from './registerScreens';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
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
        fontSize: wp('9%'),
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
        id: SIDE_MENU_ID,
        left: {
          component: {
            name: SIDE_DRAWER,
            id: SIDE_DRAWER_ID,
          }
        },
        center: {
          stack: {
            id: CENTER_STACK_ID,
              children: [{
                component: {
                  name: WELCOME_SCREEN,
                  id: WELCOME_SCREEN_ID,
                  options: {
                    topBar: {
                      title: {
                        text: "Ach' Lequilc'op"
                      },
                      leftButtons: [
                        {
                          id: MENU_BTN_ID,
                          icon: require('../assets/icons/burgerMenu.png'),
                          //color: 'white',
                          //fontSize: 20

                        }
                      ],
                      rightButtons: [
                        {
                          id: PLAY_BTN_ID,
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
