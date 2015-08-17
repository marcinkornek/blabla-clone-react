import { combineReducers } from 'redux';
import session         from './session';
import users               from './users';

const rootReducer = combineReducers({
  session,
  users
});

export default rootReducer;
