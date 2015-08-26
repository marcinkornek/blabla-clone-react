import { combineReducers } from 'redux';
import session             from './session';
import users               from './users';
import user                from './user';
import cars                from './cars';

const rootReducer = combineReducers({
  session,
  users,
  user,
  cars
});

export default rootReducer;
