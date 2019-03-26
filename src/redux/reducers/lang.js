import {
  FETCH_SPANISH,
  FETCH_TSELTAL
} from "../actions/actionTypes";

const initialState = {
  languageData: "Todavía No"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPANISH:
      return {...state, languageData: "Castilla"};
    case FETCH_TSELTAL:
    return {
      ...state,
      languageData: "Bats'il C'op"
    };
    default:
      return state;
  }
};

export default reducer;
