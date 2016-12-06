import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import { APIEndpoints, ActionCableURL } from './constants/constants'
import { loginFromCookie, saveToLocalStorage } from './sessions/actions/session'
import { fetchCurrentUser } from './users/actions/users'
import { fetchNotifications } from './notifications/actions/notifications'

function getFromLocalStorage(store) {
  const email = localStorage.getItem('email')
  const access_token = localStorage.getItem('access_token')
  const data = { email: email, access_token: access_token }
  if (email != null && access_token != null) {
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

function renderRoot(Root, store, history) {
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

function renderApp(store) {
  const history = syncHistoryWithStore(browserHistory, store)
  renderRoot(Root, store, history)

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const Root = require('./containers/Root').default;
      renderRoot(Root, store, history)
    })
  }
}

const store = configureStore(browserHistory)
getFromLocalStorage(store)
