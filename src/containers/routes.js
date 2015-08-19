import React           from 'react'
import { Route } 			 from 'react-router'
import * as components from '../components'

const {
  Application,
  Header,
  Home,
  LoginPage,
  UsersIndexPage,
  UsersShowPage
} = components

export default (
	<Route component = { Application }>
    <Route name='home'  path='/'      component={ Home } />
    <Route name='login' path='/login' component={ LoginPage } />
    <Route name='usersIndex' path='/users' component={ UsersIndexPage } />
    <Route name='usersShow' path='/users/:userId' component={ UsersShowPage } />
  </Route>
)