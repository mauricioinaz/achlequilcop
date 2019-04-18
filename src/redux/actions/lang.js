import {
  SELECTED_SPANISH,
  SELECTED_TSELTAL,
  SELECTED_ALWAYS_CONNECTED,
  SELECTED_WIFI_ONLY
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
