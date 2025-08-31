import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  applyMiddleware()
)

export default store