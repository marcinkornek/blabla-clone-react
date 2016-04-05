import React, { Component, PropTypes } from 'react'
import { Provider }                    from 'react-redux'
import { Router, browserHistory }      from 'react-router'
import { createRoutes }                from '../routes';

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    const routes = createRoutes(store);

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
