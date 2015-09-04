import React           from 'react'
import { Router, Route }       from 'react-router'
import * as components from '../components'
import * as actions    from '../actions/session'
import * as cons       from '../constants/constants'

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

function checkPermission(path, store, permission) {
  return (nextState, transition) => {
    checkIfLoggedIn(store)
    if (isPublic(permission)) {
      return;
    } else {
      if (isLoggedIn(store)) {
        if (setTimeout(isAuthorized(store, permission), 1)) {
          return;
        } else {
          transition.to('/notAuthorized');
        }
      } else {
        transition.to('/login');
      }
    }
  }
}

function isPublic(permission) {
  return permission === 'public'
}

function checkIfLoggedIn(store) {
  if (store.getState().session.isLoggedIn) {
    if (localStorage.getItem('email') === null) {
      saveToLocalStorage(store)
      isLogged = true
    }
  } else {
    if (localStorage.getItem('email') != null) {
      getFromLocalStorage(store)
      isLogged = true
    }
  }
}

function saveToLocalStorage(store) {
  if (localStorage.getItem('email') === null) {
    localStorage.setItem('email', store.getState().session.user.email)
    localStorage.setItem('access_token', store.getState().session.user.access_token)
  }
}

function getFromLocalStorage(store) {
  var session = {
    email:        localStorage.getItem('email'),
    access_token: localStorage.getItem('access_token'),
  }
  store.dispatch(actions.loginFromCookie(session, Router))
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
    <Route  name ='App' component = {Application}>
      <Route name='home'              path='/'                         component={Home}                 onEnter={checkPermission('/', store, cons.Permissions.USER)} />
      <Route name='login'             path='/login'                    component={LoginPage}            onEnter={checkPermission('/login', store, cons.Permissions.PUBLIC)} />
      <Route name='register'          path='/register'                 component={UsersNewPage}         onEnter={checkPermission('/register', store, cons.Permissions.PUBLIC)} />

      <Route name='usersIndex'        path='/users'                    component={UsersIndexPage}       onEnter={checkPermission('/users', store, cons.Permissions.USER)} />
      <Route name='usersShow'         path='/users/:userId'            component={UsersShowPage}        onEnter={checkPermission('/users/:userId', store, cons.Permissions.PUBLIC)} />
      <Route name='usersEdit'         path='/account/user'             component={UsersEditPage}        onEnter={checkPermission('/account/user', store, cons.Permissions.USER)} />

      <Route name='carsIndex'         path='/account/cars'             component={CarsIndexPage}        onEnter={checkPermission('/account/cars', store, cons.Permissions.USER)} />
      <Route name='carsEdit'          path='/account/cars/:carId/edit' component={CarsEditPage}         onEnter={checkPermission('/account/cars/:carId/edit', store, cons.Permissions.USER)} />
      <Route name='carsNew'           path='/cars/new'                 component={CarsNewPage}          onEnter={checkPermission('/cars/new', store, cons.Permissions.USER)} />
      <Route name='carsShow'          path='/cars/:carId'              component={CarsShowPage}         onEnter={checkPermission('/cars/:carId', store, cons.Permissions.PUBLIC)} />

      <Route name='ridesIndex'        path='/rides'                    component={RidesIndexPage}       onEnter={checkPermission('/rides', store, cons.Permissions.PUBLIC)} />
      <Route name='ridesDriverIndex'  path='/account/rides_as_driver'  component={RidesDriverIndexPage} onEnter={checkPermission('/account/rides_as_driver', store, cons.Permissions.USER)} />
      <Route name='ridesPassengerIndex' path='/account/rides_as_passenger'  component={RidesPassengerIndexPage} onEnter={checkPermission('/account/rides_as_passenger', store, cons.Permissions.USER)} />
      <Route name='ridesDriverIndex'  path='/account/rides_as_driver/:rideId/edit'  component={RidesEditPage} onEnter={checkPermission('/account/rides_as_driver/:rideId/edit', store, cons.Permissions.USER)} />
      <Route name='carsNew'           path='/rides/new'                component={RidesNewPage}         onEnter={checkPermission('/rides/new', store, cons.Permissions.USER)} />
      <Route name='ridesShow'         path='/rides/:rideId'            component={RidesShowPage}        onEnter={checkPermission('/rides/:rideId', store, cons.Permissions.PUBLIC)} />

      <Route name='notAuthorized'     path='/403'                      component={Home}                 onEnter={checkPermission('/403', store, cons.Permissions.PUBLIC)} />
    </Route>
  );
};
