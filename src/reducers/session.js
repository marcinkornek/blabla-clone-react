import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'

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
  case LOGIN_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
    };
  case LOGIN_FAILURE:
    return {
      ...state,
      errors: [action.errors],
      isFetching: false,
      isLoggedIn: false,
      ...action.item
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: false,
      ...emptySession
    };
  case USER_UPDATE_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
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
