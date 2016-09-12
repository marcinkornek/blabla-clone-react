import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session             from './session';
import users               from './users';
import user                from './user';
import userNotifications   from './userNotifications';
import cars                from './cars';
import carsOptions         from './carsOptions';
import car                 from './car';
import rides               from './rides';
import ride                from './ride';
import ridesOptions        from './ridesOptions';
import ridesSearch         from './ridesSearch';
import ridesDriver         from './ridesDriver';
import ridesPassenger      from './ridesPassenger';

const rootReducer = combineReducers({
  session,
  users,
  user,
  userNotifications,
  cars,
  car,
  carsOptions,
  rides,
  ride,
  ridesOptions,
  ridesSearch,
  ridesDriver,
  ridesPassenger,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
