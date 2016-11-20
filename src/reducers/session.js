import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  errors: [],
  isAuthenticated: false
}

export const emptySession = {
  id: undefined,
  access_token: undefined,
  email: undefined,
  role: undefined
}

export function session(state = initialState, action) {
  let item
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case LOGIN_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: true,
      ...item
    };
  case LOGIN_FAILURE:
    item = action.payload.data
    return {
      ...state,
      errors: [action.errors],
      isFetching: false,
      isAuthenticated: false,
      ...item
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: false,
      ...emptySession
    };
  case USER_UPDATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: true,
      ...item
    };
    case USER_UPDATE_FAILURE:
    return {
      ...state,
      errors: action.errors
    };
  default:
    return state;
  }
}
