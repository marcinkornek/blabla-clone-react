// utils
import React from 'react'
import { Route } from 'react-router'

// components
import * as components from './components'

import CarNew from './cars/containers/car-new/car-new'
import CarShow from './cars/containers/car-show/car-show'
import CarEdit from './cars/containers/car-edit/car-edit'
import CarsIndex from './cars/containers/cars-index/cars-index'

const {
  Application,
  Header,
  Home,
  Login,
  requireAuth,

  UserNew,
  UserShow,
  UserEdit,
  UsersIndex,

  RideNew,
  RideShow,
  RideEdit,
  RidesIndex,
  RidesIndexDriver,
  RidesIndexPassenger,

  NotificationsIndex,
} = components

export const createRoutes = () => {
  return (
    <Route name ='App' component = {Application}>
      <Route requireAuth>
        <Route name='usersIndex' path='/users' component={requireAuth(UsersIndex)} />
        <Route name='usersEdit' path='/account/user' component={requireAuth(UserEdit)} />

        <Route name='carsIndex' path='/account/cars' component={requireAuth(CarsIndex)} />
        <Route name='carsEdit' path='/account/cars/:carId/edit' component={requireAuth(CarEdit)} />
        <Route name='carsNew' path='/cars/new' component={requireAuth(CarNew)} />

        <Route name='ridesDriverIndex' path='/account/rides_as_driver' component={requireAuth(RidesIndexDriver)} />
        <Route name='ridesPassengerIndex' path='/account/rides_as_passenger' component={requireAuth(RidesIndexPassenger)} />
        <Route name='ridesDriverIndex' path='/account/rides_as_driver/:rideId/edit' component={requireAuth(RideEdit)} />
        <Route name='carsNew' path='/rides/new' component={requireAuth(RideNew)} />

        <Route name='notificationsIndex' path='/notifications' component={requireAuth(NotificationsIndex)} />
      </Route>

      <Route name='home' path='/' component={Home} />
      <Route name='usersShow' path='/users/:userId' component={UserShow} />
      <Route name='carsShow' path='/cars/:carId' component={CarShow} />
      <Route name='ridesIndex'  path='/rides' component={RidesIndex} />
      <Route name='ridesShow' path='/rides/:rideId' component={RideShow} />
      <Route name='notAuthorized' path='/403' component={Home} />

      <Route requireNoAuth>
        <Route name='login' path='/login' component={Login} />
        <Route name='register' path='/register' component={UserNew} />
      </Route>
    </Route>
  );
};
