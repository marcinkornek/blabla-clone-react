import { createStore, applyMiddleware, compose } from 'redux'
import thunk            from 'redux-thunk'
import createLogger     from 'redux-logger'
import rootReducer      from '../reducers'
import DevTools         from '../containers/DevTools'
import { routerMiddleware, push } from 'react-router-redux'

export default function configureStore(history, initialState) {
  const middleware = routerMiddleware(history)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, middleware),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
