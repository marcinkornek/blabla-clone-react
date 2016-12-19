// utils
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import DevTools from './DevTools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { rootRoutes } from '../routes'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { store, history } = this.props

    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <Router history={history} routes={rootRoutes} />
            <DevTools />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
