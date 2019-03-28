import { Navigation } from 'react-native-navigation';

import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  SIDE_DRAWER
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function pushInitialScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      animate: false,
      drawBehind: true,
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
    // leftButtons: [
    //   {
    //     id: 'nav_btn',
    //     text: "NAV",
    //     //icon: "NAV",
    //     color: 'white'
    //   }
    // ],
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
        sideMenu: {
          id: "sideMenu",
          left: {
            //enabled: true,
            component: {
              name: SIDE_DRAWER,
              //id: 'settingsDrawer',
              // passProps: {
              //   text: 'Menú Lateral'
              // }
            }
          },
          center: {
              // TODO: eliminate stack?
            stack: {
                id: "CenterStack",
                  // options: {
                  // },
                  children: [{
                      component: {
                        name: WELCOME_SCREEN,
                        id: "WelcomeScreen",
                        options: {
                            //animated: true,
                          topBar: {
                            title: {
                              text: "ACH' LEQUILC'OP"
                            },
                            leftButtons: [
                              {
                                id: 'nav_btn',
                                //text: "N",
                                icon: require('../assets/icons/burgerMenu.png'),
                                color: 'white',
                                // component: {
                                //   name: SIDE_DRAWER,
                                //   id: 'settingsDrawer',
                                //   passProps: {
                                //       onPress: isOpened => Navigation.mergeOptions(WELCOME_SCREEN, {
                                //       sideMenu: {
                                //         left: {
                                //           visible: isOpened,
                                //         },
                                //       },
                                //     }),
                                //   }
                                // }
                              }
                            ],
                            rightButtons: [
                              {
                                id: 'nav_play_btn',
                                text: "PLAY",
                                //icon: "PLAY",
                                color: 'white'
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

    //Navigation.setStackRoot(WELCOME_SCREEN)

    // Navigation.mergeOptions('SideMenu', {
    //     sideMenu: {
    //         left: {
    //             visible: false,
    //             enabled: false,
    //         }
    //     }
    // });

}

const buttonHamburger = componentId => ({
  id: 'button.Hamburger',
  component: {
    name: 'component.Hamburger',
    passProps: {
      onPress: isOpened => Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: isOpened,
          },
        },
      }),
    },
  },
})
