import * as storage        from 'redux-storage'
import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session             from './session';
import users               from './users';
import user                from './user';
import cars                from './cars';
import carsOptions         from './carsOptions';
import car                 from './car';
import rides               from './rides';
import ride                from './ride';
import ridesOptions        from './ridesOptions';
import ridesDriver         from './ridesDriver';
import ridesPassenger      from './ridesPassenger';

const rootReducer = storage.reducer(combineReducers({
  session,
  users,
  user,
  cars,
  car,
  carsOptions,
  rides,
  ride,
  ridesOptions,
  ridesDriver,
  ridesPassenger,
  routing: routerReducer,
  form: formReducer
}));

export default rootReducer;
