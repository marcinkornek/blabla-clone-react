import React                            from 'react'
import { Redirect, Router, Route }      from 'react-router'
import { Provider }                     from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware  from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import LoginPage        from './components/javascripts/session/LoginPage'
import Header           from './components/javascripts/Header'
import Application      from './components/javascripts/Application'
import Home             from './components/javascripts/Home'
import * as storage     from './store/storage'
import * as reducers    from './reducers'
import * as constants   from './constants/ActionTypes'
import rootReducer      from './reducers/index'

const initialState = {
  application: {
    loggedIn: !!storage.get('token'),
    user: { permissions: [/*'manage_account'*/] }
  }
}

const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)
const store = finalCreateStore(rootReducer, initialState)

export default class Root extends React.Component {

  render () {
    const { history } = this.props
    return (
      <Provider store={store}>
        {renderRoutes.bind(null, history)}
      </Provider>
    )
  }
}

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route name='home'  path='/'      component={Home} />
        <Route name='login' path='/login' component={LoginPage} />
      </Route>
    </Router>
  )
}
