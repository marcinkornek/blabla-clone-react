import React           from 'react'
import { Router, Route } from 'react-router'
import * as components from './components'
import * as actions    from './actions/session'
import * as cons       from './constants/constants'
import { routerMiddleware, push } from 'react-router-redux'

var isLogged = false

const {
  Application,
  Header,
  Home,
  Login,

  UserNew,
  UserShow,
  UserEdit,
  UsersIndex,

  CarNew,
  CarShow,
  CarEdit,
  CarsIndex,

  RideNew,
  RideShow,
  RideEdit,
  RidesIndex,
  RidesIndexDriver,
  RidesIndexPassenger,

  NotificationsIndexPage,
} = components

function checkPermission(store, permission) {
  return (nextState, replace) => {
    if (isPublic(permission)) {
      return;
    } else {
      checkIfLoggedIn(store)
      if (isLoggedIn(store)) {
        if (isAuthorized(store, permission)) {
          return;
        } else {
          replace('/403')
        }
      } else {
        replace('/login')
      }
    }
  }
}

function isPublic(permission) {
  return permission === 'public'
}

function checkIfLoggedIn(store) {
  if (store.getState().session.isLoggedIn == true) {
    isLogged = true
  }
}

function isLoggedIn(store) {
  return isLogged
}

function isAuthorized(store, permission) {
  var userPermission = store.getState().session.role
  if (userPermission === 'admin') {
    return true;
  } else {
    return userPermission === permission;
  }
}

export const createRoutes = (store) => {
  return (
    <Route name ='App' component = {Application}>
      <Route requireAuth>
        <Route name='usersIndex' path='/users' component={UsersIndex} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='usersEdit' path='/account/user' component={UserEdit} onEnter={checkPermission(store, cons.Permissions.USER)} />

        <Route name='carsIndex' path='/account/cars' component={CarsIndex} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsEdit' path='/account/cars/:carId/edit' component={CarEdit} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsNew' path='/cars/new' component={CarNew} onEnter={checkPermission(store, cons.Permissions.USER)} />

        <Route name='ridesDriverIndex' path='/account/rides_as_driver' component={RidesIndexDriver} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='ridesPassengerIndex' path='/account/rides_as_passenger' component={RidesIndexPassenger} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='ridesDriverIndex' path='/account/rides_as_driver/:rideId/edit' component={RideEdit} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsNew' path='/rides/new' component={RideNew} onEnter={checkPermission(store, cons.Permissions.USER)} />

        <Route name='notificationsIndex' path='/notifications' component={NotificationsIndexPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
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
