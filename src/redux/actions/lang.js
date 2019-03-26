import { FETCH_SPANISH, FETCH_TSELTAL} from './actionTypes';

export const fetchSpanish = () => {
    return {
        type: FETCH_SPANISH
    };
};

export const fetchTseltal = () => {
    return {
        type: FETCH_TSELTAL
    };
};
