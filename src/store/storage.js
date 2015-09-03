import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware                      from 'redux-thunk';
import loggerMiddleware                     from '../middleware/logger';
import { devTools, persistState }           from 'redux-devtools';
import rootReducer                          from '../reducers/index';

const finalCreateStoreDev = compose(
  applyMiddleware(thunkMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const finalCreateStoreProd = compose(
  applyMiddleware(thunkMiddleware),
  createStore
);

export default function storage() {
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    return finalCreateStoreDev(rootReducer);
  } else {
    return finalCreateStoreProd(rootReducer);
  }
}
