import React from 'react'
import * as actions from './actions/session'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'

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
    <AppContainer
      component={Root}
      props={{ store }}
    />,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      render(
        <AppContainer
          component={require('./containers/Root').default}
          props={{ store }}
        />,
        document.getElementById('root')
      )
    })
  }
}

const store = configureStore(browserHistory)
getFromLocalStorage(store)
