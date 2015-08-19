import { combineReducers } from 'redux';
import session             from './session';
import users               from './users';
import user                from './user';

const rootReducer = combineReducers({
  session,
  users,
  user
});

export default rootReducer;
