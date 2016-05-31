import React from 'react'
import * as actions from './actions/session'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

function getFromLocalStorage() {
  var email = localStorage.getItem('email')
  var access_token = localStorage.getItem('access_token')
  var data = { email: email, access_token: access_token }
  if (email != null && access_token != null) {
    store.dispatch(actions.loginFromCookie(data))
  }
}

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
getFromLocalStorage()

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
