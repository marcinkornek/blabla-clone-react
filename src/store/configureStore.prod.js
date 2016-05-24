import { createStore, applyMiddleware } from 'redux'
import thunk            from 'redux-thunk'
import rootReducer      from '../reducers'
import { routerMiddleware, push } from 'react-router-redux'

export default function configureStore(history, initialState = {}) {
  const rMiddleware = routerMiddleware(history)

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, rMiddleware)
  )

  return store
}
