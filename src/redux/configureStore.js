import { createStore, combineReducers } from 'redux';

import langReducer from './reducers/lang';
import playReducer from './reducers/play';

const rootReducer = combineReducers({
    lang: langReducer,
    play: playReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
