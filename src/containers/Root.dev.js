import React, { Component, PropTypes } from 'react'
import { Provider }                    from 'react-redux'
import { Router, browserHistory }      from 'react-router'
import { createRoutes }                from '../routes';
import configureStore                  from '../store/configureStore'
import DevTools                        from './DevTools'

const store = configureStore(browserHistory)
const routes = createRoutes(store);

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
