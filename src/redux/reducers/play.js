import {
  START_PLAY,
  STOP_PLAY,
  ENABLE_PLAY,
  DISABLE_PLAY
} from "../actions/actionTypes";

const initialState = {
  playStopButton: 'Preparing...',
  playButtonDisabled: true,
  playError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PLAY:
        return {...state, playStopButton: "REPRODUCIR"};
    case STOP_PLAY:
        return {...state, playStopButton: "DETENER"};
    case ENABLE_PLAY:
        return {...state, playButtonDisabled: false};
    case DISABLE_PLAY:
        return {...state, playButtonDisabled: true};
    default: return state;
  }
};

export default reducer;
