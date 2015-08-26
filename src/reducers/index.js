import { combineReducers } from 'redux';
import session             from './session';
import users               from './users';
import user                from './user';
import cars                from './cars';
import carsOptions         from './carsOptions';

const rootReducer = combineReducers({
  session,
  users,
  user,
  cars,
  carsOptions
});

export default rootReducer;
