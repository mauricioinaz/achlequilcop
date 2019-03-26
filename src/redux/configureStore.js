import { createStore, combineReducers } from 'redux';

import langReducer from './reducers/lang';

const rootReducer = combineReducers({
    lang: langReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;
