import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { APIRoot } from '../constants/constants'

const client = axios.create({
   baseURL: APIRoot,
   headers: {
     'Accept': 'application/vnd.blabla-clone-v1+json',
     'Content-Type': 'application/json'
   },
   responseType: 'json'
})

export default function configureStore(history, initialState = {}) {
  const rMiddleware = routerMiddleware(history)

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      rMiddleware,
      axiosMiddleware(client)
    )
  )

  return store
}
