import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  CURRENT_USER_UPDATE_SUCCESS,
} from '../action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  errors: [],
  isAuthenticated: false,
  id: undefined,
  access_token: undefined,
  email: undefined,
  role: undefined
}

export function session(state = initialState, action) {
  let item, errors
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
    errors = action.error.response.data.error
    return {
      ...initialState,
      errors: [errors],
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: false,
      ...initialState
    };
  case CURRENT_USER_UPDATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: true,
      email: item.email
    };
  default:
    return state;
  }
}
