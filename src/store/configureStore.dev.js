import { createStore, applyMiddleware, compose } from 'redux'
import * as storage     from 'redux-storage'
import * as types       from '../constants/ActionTypes'
import createEngine     from 'redux-storage-engine-localstorage';
import thunk            from 'redux-thunk'
import createLogger     from 'redux-logger'
import rootReducer      from '../reducers'
import DevTools         from '../containers/DevTools'
import { routerMiddleware, push } from 'react-router-redux'

const engine = createEngine('my-save-key');
const sMiddleware = storage.createMiddleware(engine, [types.RIDES_SEARCH_FORM]);

export default function configureStore(history, initialState) {
  const rMiddleware = routerMiddleware(history)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, rMiddleware, sMiddleware),
      DevTools.instrument()
    )
  )

  const load = storage.createLoader(engine);
  load(store);

  load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
