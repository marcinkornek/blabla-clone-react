import React, { Component, PropTypes } from 'react'
import { Provider }                    from 'react-redux'
import { Router, browserHistory }      from 'react-router'
import { createRoutes }                from '../routes'
import DevTools                        from './DevTools'
import MuiThemeProvider                from 'material-ui/styles/MuiThemeProvider'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    const routes = createRoutes(store);

    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
