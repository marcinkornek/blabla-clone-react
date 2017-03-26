import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import { ActionCableURL } from './constants/constants'
import { loginFromCookie, saveToLocalStorage } from './actions/session'
import { fetchCurrentUser } from './actions/users'
import { fetchNotifications } from './actions/notifications'
import ActionCable from 'actioncable'

function getFromLocalStorage(store) {
  const email = localStorage.getItem('email')
  const access_token = localStorage.getItem('access_token')
  const data = { email: email, access_token: access_token }
  if (email !== null && access_token !== null) {
    store.dispatch(loginFromCookie(data))
      .then(() => {
        store.dispatch(fetchCurrentUser())
        store.dispatch(fetchNotifications())
        window.cable = ActionCable.createConsumer(`${ActionCableURL}?email=${email}&token=${access_token}`)
        store.dispatch(saveToLocalStorage(email, access_token))
        renderApp(store)
      })
      .catch((error) => {
        localStorage.clear()
        renderApp(store)
        browserHistory.push('/login')
      })
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
