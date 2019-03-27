import { SELECTED_SPANISH, SELECTED_TSELTAL} from './actionTypes';
import {AsyncStorage} from 'react-native';

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
