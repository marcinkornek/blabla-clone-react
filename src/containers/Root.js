import React                            from 'react'
import { Redirect, Router, Route }      from 'react-router'
import { Provider }                     from 'react-redux'
import storage                          from '../store/storage';
import * as components                  from '../components/javascripts'

const {
  Application,
  Header,
  Home,
  LoginPage,
  UsersPage
} = components

var store = storage()

export default class Root extends React.Component {
  render () {
    const { history } = this.props
    return (
      <Provider store = { store }>
        { renderRoutes.bind(null, history) }
      </Provider>
    )
  }
}

function renderRoutes (history) {
  return (
    <Router history = { history }>
      <Route component = { Application }>
        <Route name='home'  path='/'      component={ Home } />
        <Route name='login' path='/login' component={ LoginPage } />
        <Route name='users' path='/users' component={ UsersPage } />
      </Route>
    </Router>
  )
}
