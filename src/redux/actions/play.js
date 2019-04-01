import {
  START_PLAY,
  STOP_PLAY,
  ENABLE_PLAY,
  DISABLE_PLAY,
  PLAY_TOGGLE
} from "./actionTypes";

export const startPlay = () => {
    return {
        type: START_PLAY
    };
};

export const stopPlay = () => {
    return {
        type: STOP_PLAY
    };
};

export const enablePlay = () => {
    return {
        type: ENABLE_PLAY
    };
};

export const disablePlay = () => {
    return {
        type: DISABLE_PLAY
    };
};

export const playToggle = () => {
    return {
        type: PLAY_TOGGLE
    };
};
