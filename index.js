import { Navigation } from 'react-native-navigation'
import { pushInitialScreen } from './src/navigation'
import { WelcomeScreen } from './src/screens';

Navigation.events().registerAppLaunchedListener(() => pushInitialScreen());


// import { Navigation } from "react-native-navigation";
// import App from "./App";
//
// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
//
// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "navigation.playground.WelcomeScreen"
//       }
//     }
//   });
// });
