import { createStore, applyMiddleware } from 'redux'
import * as storage     from 'redux-storage'
import createEngine     from 'redux-storage-engine-localstorage';
import thunk            from 'redux-thunk'
import rootReducer      from '../reducers'
import { routerMiddleware, push } from 'react-router-redux'

const engine = createEngine('my-save-key');
const sMiddleware = storage.createMiddleware(engine);

export default function configureStore(history, initialState = {}) {
  const rMiddleware = routerMiddleware(history)

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, rMiddleware, sMiddleware)
  )

  const load = storage.createLoader(engine);
  load(store);

  load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

  return store
}
