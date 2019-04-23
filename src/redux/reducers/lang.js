import {AsyncStorage} from 'react-native';

import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL,
  SELECTED_WIFI_ONLY,
  SELECTED_ALWAYS_CONNECTED
} from "../actions/actionTypes";
import {
  ONLY_WIFI,
  ALWAYS_CONNECTED,
  TSELTAL,
  CASTILLA,
  LANGUAGE_ASYNC,
  CONNECTION_ASYNC
} from '../constants'


const initialState = {
  language: CASTILLA,
  languageData: "Castilla",
  wifiOnly: true
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SPANISH:
      AsyncStorage.setItem(LANGUAGE_ASYNC, CASTILLA);
      return {...state, language: CASTILLA, languageData: "Castellano"};
    case SELECTED_TSELTAL:
      AsyncStorage.setItem(LANGUAGE_ASYNC, TSELTAL);
      return {...state, language: TSELTAL,  languageData: "Bats'il C'op"};
    case SELECTED_WIFI_ONLY:
      AsyncStorage.setItem(CONNECTION_ASYNC, ONLY_WIFI);
      return {...state, wifiOnly: true};
    case SELECTED_ALWAYS_CONNECTED:
      AsyncStorage.setItem(CONNECTION_ASYNC, ALWAYS_CONNECTED);
      return {...state,  wifiOnly: false};
    default: return state;
  }
};


export default reducer;
