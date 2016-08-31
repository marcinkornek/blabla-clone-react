import React from 'react'
import * as actions from './actions/session'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

function getFromLocalStorage(store) {
  var email = localStorage.getItem('email')
  var access_token = localStorage.getItem('access_token')
  var data = { email: email, access_token: access_token }
  if (email != null && access_token != null) {
    store.dispatch(actions.loginFromCookie(data)).then(setTimeout(() => renderApp(store), 500))
  } else {
    renderApp(store)
  }
}

function renderApp(store) {
  const history = syncHistoryWithStore(browserHistory, store)
  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  )
}

const store = configureStore(browserHistory)
getFromLocalStorage(store)
