import { combineReducers } from 'redux';
import session             from './session';
import users               from './users';
import user                from './user';
import cars                from './cars';
import carsOptions         from './carsOptions';
import car                 from './car';
import rides               from './rides';

const rootReducer = combineReducers({
  session,
  users,
  user,
  cars,
  car,
  carsOptions,
  rides
});

export default rootReducer;
