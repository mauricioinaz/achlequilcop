import {AsyncStorage} from 'react-native';

import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL,
  SELECTED_WIFI_ONLY,
  SELECTED_ALWAYS_CONNECTED,
  SHOW_MODAL_INTRO,
  HIDE_MODAL_INTRO
} from "../actions/actionTypes";
import {
  ONLY_WIFI,
  ALWAYS_CONNECTED,
  TSELTAL,
  CASTILLA,
  LANGUAGE_ASYNC,
  CONNECTION_ASYNC,
  SPANISH_DATA,
  TSELTAL_DATA
} from '../constants'


const initialState = {
  language: CASTILLA,
  languageData: SPANISH_DATA,
  wifiOnly: true,
  modalIntro: false
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SPANISH:
      AsyncStorage.setItem(LANGUAGE_ASYNC, CASTILLA);
      return {...state, language: CASTILLA, languageData: SPANISH_DATA};
    case SELECTED_TSELTAL:
      AsyncStorage.setItem(LANGUAGE_ASYNC, TSELTAL);
      return {...state, language: TSELTAL,  languageData: TSELTAL_DATA};
    case SELECTED_WIFI_ONLY:
      AsyncStorage.setItem(CONNECTION_ASYNC, ONLY_WIFI);
      return {...state, wifiOnly: true};
    case SELECTED_ALWAYS_CONNECTED:
      AsyncStorage.setItem(CONNECTION_ASYNC, ALWAYS_CONNECTED);
      return {...state,  wifiOnly: false};
    case SHOW_MODAL_INTRO:
      return {...state,  modalIntro: true};
    case HIDE_MODAL_INTRO:
      console.log('HIDING MODAL 2');
      return {...state,  modalIntro: false};
    default: return state;
  }
};


export default reducer;
