import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  errors: [],
  isLoggedIn: false
}

const emptySession = {
  id: undefined,
  access_token: undefined,
  email: undefined,
  role: undefined
}

export default function session(state = initialState, action) {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case types.LOGIN_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
    };
  case types.LOGIN_FAILURE:
    return {
      ...state,
      errors: [action.errors],
      isFetching: false,
      isLoggedIn: false,
      ...action.item
    };
  case types.LOGOUT_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: false,
      ...emptySession
    };
  case types.USER_UPDATE_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
    };
    case types.USER_UPDATE_FAILURE:
    return {
      ...state,
      errors: action.errors
    };
  default:
    return state;
  }
}
