import {AsyncStorage} from 'react-native';

import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL,
  SELECTED_WIFI_ONLY,
  SELECTED_ALWAYS_CONNECTED
} from "../actions/actionTypes";


const initialState = {
  language: null,
  languageData: "Castilla",
  wifiOnly: true
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SPANISH:
      AsyncStorage.setItem("ach:language","castilla");
      return {...state, language: "Castilla", languageData: "Castilla"};
    case SELECTED_TSELTAL:
      AsyncStorage.setItem("ach:language","tseltal");
      return {...state, language: "Bats'il C'op",  languageData: "Bats'il C'op"};
    case SELECTED_WIFI_ONLY:
      AsyncStorage.setItem("ach:connection","wifiOnly");
      return {...state, wifiOnly: true};
    case SELECTED_ALWAYS_CONNECTED:
      AsyncStorage.setItem("ach:connection","alwaysConnected");
      return {...state,  wifiOnly: false};
    default: return state;
  }
};


export default reducer;
