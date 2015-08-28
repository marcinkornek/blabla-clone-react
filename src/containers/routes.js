import React           from 'react'
import { Route } 			 from 'react-router'
import * as components from '../components'
import * as cons       from '../constants/constants'

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
} = components

function checkPermission(store, permission) {
  return (nextState, transition) => {
    if (isPublic(permission)) {
      return;
    } else {
      if (isLoggedIn(store)) {
        if (isAuthorized(store, permission)) {
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

function isLoggedIn(store) {
  return store.getState().session.isLoggedIn
}

function isAuthorized(store, permission) {
  var userPermission = store.getState().session.user.permission
  console.log('isAuthorized', userPermission, permission)
  if (userPermission === 'admin') {
    return true;
  } else {
    return userPermission === permission;
  }
}

export const createRoutes = (store) => {
  return (
    <Route  name ='App' component = {Application}>
      <Route name='home'           path='/'                  component={Home}             onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='login'          path='/login'             component={LoginPage}        onEnter={checkPermission(store, cons.Permissions.PUBLIC)} />
      <Route name='register'       path='/register'          component={UsersNewPage}     onEnter={checkPermission(store, cons.Permissions.PUBLIC)} />
      <Route name='usersIndex'     path='/users'             component={UsersIndexPage}   onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='usersShow'      path='/users/:userId'     component={UsersShowPage}    onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='usersEdit'      path='/account/user'      component={UsersEditPage}    onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='usersEdit'      path='/account/cars'      component={CarsIndexPage}    onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='carsEdit'       path='/account/cars/:carId/edit'  component={CarsEditPage}     onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='carsNew'        path='/cars/new'          component={CarsNewPage}      onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='carsShow'       path='/cars/:carId'       component={CarsShowPage}     onEnter={checkPermission(store, cons.Permissions.USER)} />
      <Route name='notAuthorized'  path='/403'               component={Home}             onEnter={checkPermission(store, cons.Permissions.PUBLIC)} />
    </Route>
  );
};
