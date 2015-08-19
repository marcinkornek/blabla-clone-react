import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware                      from 'redux-thunk';
import loggerMiddleware                     from '../middleware/logger';
import { devTools, persistState }           from 'redux-devtools';
import rootReducer                          from '../reducers/index';

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

export default function storage() {
  return finalCreateStore(rootReducer);
}
