import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

function getFromLocalStorage() {
  var email = localStorage.getItem('email')
  var access_token = localStorage.getItem('access_token')
  if (email != null && access_token != null) {
    return({
      session: { user: { email: email, access_token: access_token } }
    })
  }
}

const store = configureStore(browserHistory, getFromLocalStorage())
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
