import {AsyncStorage} from 'react-native';

import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL
} from "../actions/actionTypes";


const initialState = {
  language: null,
  languageData: "Cast"
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SPANISH:
        AsyncStorage.setItem("ach:language","castilla");
        return {...state, language: "Castilla", languageData: "Castilla"};
    case SELECTED_TSELTAL:
        AsyncStorage.setItem("ach:language","tseltal");
        return {...state, language: "Bats'il C'op",  languageData: "Bats'il C'op"};
    default: return state;
  }
};


export default reducer;
