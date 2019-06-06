import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL,
  SELECTED_ALWAYS_CONNECTED,
  SELECTED_WIFI_ONLY,
  SHOW_MODAL_INTRO,
  HIDE_MODAL_INTRO
} from './actionTypes';

export const fetchSpanish = () => {
    return {
        type: SELECTED_SPANISH
    };
};

export const fetchTseltal = () => {
    return {
        type: SELECTED_TSELTAL
    };
};

export const selectWifiOnly = () => {
    return {
        type: SELECTED_WIFI_ONLY
    };
};

export const selectedAlwaysConnected = () => {
    return {
        type: SELECTED_ALWAYS_CONNECTED
    };
};

export const showModalIntro = () => {
    return {
        type: SHOW_MODAL_INTRO
    };
};

export const hideModalIntro = () => {
  console.log('HIDE MODAL 1');
    return {
        type: HIDE_MODAL_INTRO
    };
};
