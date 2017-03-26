import { createStore, applyMiddleware, compose } from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
import { routerMiddleware } from 'react-router-redux'
import { APIRoot } from '../constants/constants'
import update from 'immutability-helper';

export default function configureStore(history, initialState) {
  const client = axios.create({
     baseURL: APIRoot,
     headers: {
       'Accept': 'application/vnd.blabla-clone-v1+json',
       'Content-Type': 'application/json'
     },
     responseType: 'json',
     returnRejectedPromiseOnError: true,
  })

  const rMiddleware = routerMiddleware(history)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        rMiddleware,
        axiosMiddleware(client)
      ),
      DevTools.instrument()
    )
  )

  client.interceptors.request.use((config) => {
    const email = store.getState().session.email || localStorage.getItem('email')
    const access_token = store.getState().session.access_token ||localStorage.getItem('access_token')
    if (!email || !access_token) {
      return config;
    } else {
      return update(config, {
        $merge: {
          headers: {
            'X-User-Email': email,
            'X-User-Token': access_token,
          },
        },
      });
    }
  });

  return store
}
