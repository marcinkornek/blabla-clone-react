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
  LoginPage,

  UsersNewPage,
  UsersIndexPage,
  UsersShowPage,
  UsersEditPage,

  CarsNewPage,
  CarsIndexPage,
  CarsShowPage,
  CarsEditPage,

  RidesNewPage,
  RidesIndexPage,
  RidesDriverIndexPage,
  RidesPassengerIndexPage,
  RidesShowPage,
  RidesEditPage,
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
  var userPermission = store.getState().session.user.permission
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
        <Route name='usersIndex' path='/users' component={UsersIndexPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='usersEdit' path='/account/user' component={UsersEditPage} onEnter={checkPermission(store, cons.Permissions.USER)} />

        <Route name='carsIndex' path='/account/cars' component={CarsIndexPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsEdit' path='/account/cars/:carId/edit' component={CarsEditPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsNew' path='/cars/new' component={CarsNewPage} onEnter={checkPermission(store, cons.Permissions.USER)} />

        <Route name='ridesDriverIndex' path='/account/rides_as_driver' component={RidesDriverIndexPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='ridesPassengerIndex' path='/account/rides_as_passenger' component={RidesPassengerIndexPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='ridesDriverIndex' path='/account/rides_as_driver/:rideId/edit' component={RidesEditPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
        <Route name='carsNew' path='/rides/new' component={RidesNewPage} onEnter={checkPermission(store, cons.Permissions.USER)} />
      </Route>

      <Route name='home' path='/' component={Home} />
      <Route name='usersShow' path='/users/:userId' component={UsersShowPage} />
      <Route name='carsShow' path='/cars/:carId' component={CarsShowPage} />
      <Route name='ridesIndex'  path='/rides' component={RidesIndexPage} />
      <Route name='ridesShow' path='/rides/:rideId' component={RidesShowPage} />
      <Route name='notAuthorized' path='/403' component={Home} />

      <Route requireNoAuth>
        <Route name='login' path='/login' component={LoginPage} />
        <Route name='register' path='/register' component={UsersNewPage} />
      </Route>
    </Route>
  );
};
