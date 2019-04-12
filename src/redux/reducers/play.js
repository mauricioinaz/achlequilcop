import {
  START_PLAY,
  STOP_PLAY,
  ENABLE_PLAY,
  DISABLE_PLAY,
  PLAY_TOGGLE
} from "../actions/actionTypes";

const initialState = {
  playToggle: true,
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
    case PLAY_TOGGLE:
        return {...state, playToggle: !state.playToggle};
    default: return state;
  }
};

export default reducer;
