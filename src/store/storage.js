import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import loggerMiddleware from '../middleware/logger';
import rootReducer      from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function storage(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
