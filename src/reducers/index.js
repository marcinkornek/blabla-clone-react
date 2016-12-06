import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { session } from './session'
import { users } from './users'
import { currentUser } from './current-user'
import { user } from './user'
import { notifications } from './notifications'
import { cars } from '../cars/reducers/cars'
import { carOptions } from '../cars/reducers/car-options'
import { car } from '../cars/reducers/car'
import { rides } from './rides'
import { ride } from './ride'
import { rideOptions } from './ride-options'
import { ridesSearch } from './rides-search'
import { ridesDriver } from './rides-driver'
import { ridesPassenger } from './rides-passenger'

const rootReducer = combineReducers({
  session,
  users,
  user,
  currentUser,
  notifications,
  cars,
  car,
  carOptions,
  rides,
  ride,
  rideOptions,
  ridesSearch,
  ridesDriver,
  ridesPassenger,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
