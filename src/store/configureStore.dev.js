import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(history, initialState) {
  const rMiddleware = routerMiddleware(history)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        rMiddleware
      ),
      DevTools.instrument()
    )
  )

  return store
}
