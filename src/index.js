import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import { persistStore } from 'redux-persist';
import { ActionCableURL } from './constants/constants'
import { fetchCurrentUser } from './actions/users'
import { fetchNotifications } from './actions/notifications'
import ActionCable from 'actioncable'

function renderApp(store) {
  const history = syncHistoryWithStore(browserHistory, store)
  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  )
}

const store = configureStore(browserHistory)

persistStore(store, {
  whitelist: [
    'session',
    'currentUser',
  ]
}, () => {
  const { session } = store.getState()
  store.dispatch(fetchCurrentUser())
  store.dispatch(fetchNotifications())
  window.cable = ActionCable.createConsumer(`${ActionCableURL}?email=${session.email}&token=${session.access_token}`)
  renderApp(store)
})
