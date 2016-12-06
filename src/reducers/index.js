import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { session } from './session'
import { notifications } from './notifications'

import { users } from '../users/reducers/users'
import { currentUser } from '../users/reducers/current-user'
import { user } from '../users/reducers/user'

import { cars } from '../cars/reducers/cars'
import { carOptions } from '../cars/reducers/car-options'
import { car } from '../cars/reducers/car'

import { rides } from '../rides/reducers/rides'
import { ride } from '../rides/reducers/ride'
import { rideOptions } from '../rides/reducers/ride-options'
import { ridesSearch } from '../rides/reducers/rides-search'
import { ridesDriver } from '../rides/reducers/rides-driver'
import { ridesPassenger } from '../rides/reducers/rides-passenger'

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
