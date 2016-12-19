// utils
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { rootRoutes } from '../routes'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { store, history } = this.props
    const routes = createRoutes(store)

    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history} routes={rootRoutes} />
        </Provider>
      </MuiThemeProvider>
    )
  }
}
