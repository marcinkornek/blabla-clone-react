// utils
import React from 'react'
import { Route } from 'react-router'

// components
import Application from './containers/application'
import Header from './components/header/header/header'
import Home from './components/home'

import requireAuth from './containers/shared/require-auth/require-auth'

import Login from './sessions/containers/login/login'

import CarNew from './cars/containers/car-new/car-new'
import CarShow from './cars/containers/car-show/car-show'
import CarEdit from './cars/containers/car-edit/car-edit'
import CarsIndex from './cars/containers/cars-index/cars-index'

import RideNew from './rides/containers/ride-new/ride-new'
import RideShow from './rides/containers/ride-show/ride-show'
import RideEdit from './rides/containers/ride-edit/ride-edit'
import RidesIndex from './rides/containers/rides-index/rides-index'
import RidesIndexDriver from './rides/containers/rides-index-driver/rides-index-driver'
import RidesIndexPassenger from './rides/containers/rides-index-passenger/rides-index-passenger'

import UserNew from './users/containers/user-new/user-new'
import UserShow from './users/containers/user-show/user-show'
import UserEdit from './users/containers/user-edit/user-edit'
import UsersIndex from './users/containers/users-index/users-index'

import NotificationsIndex from './notifications/containers/notifications-index/notifications-index'

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
