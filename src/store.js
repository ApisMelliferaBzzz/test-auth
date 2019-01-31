import { createStore } from 'redux';
import {combineReducers} from 'redux-immutable';
import {localizationReducer} from './localizeReducer';
import loginFormReducer from './containers/loginForm/reducer';

const store = createStore(
  combineReducers({
    localization: localizationReducer,
    loginForm: loginFormReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
