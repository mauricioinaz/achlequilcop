import { Navigation } from 'react-native-navigation'
import { pushInitialScreen } from './src/navigation'

Navigation.events().registerAppLaunchedListener(() => pushInitialScreen());
