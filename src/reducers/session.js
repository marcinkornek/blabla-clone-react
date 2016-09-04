import * as types from '../constants/ActionTypes'

const initialState = {
  errors: [],
  isFetching: false,
  isLoggedIn: false
}

export default function session(state = initialState, action) {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case types.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
    });
  case types.LOGIN_FAILURE:
    return Object.assign({}, state, {
      errors: [action.errors],
      isFetching: false,
      isLoggedIn: false,
      ...action.item
    });
  case types.LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      errors: [],
      isFetching: false,
      isLoggedIn: false,
      id: undefined,
      access_token: undefined,
      email: undefined,
      role: undefined
    });
  case types.USER_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      errors: [],
      isFetching: false,
      isLoggedIn: true,
      ...action.item
    });
    case types.USER_UPDATE_FAILURE:
    return Object.assign({}, state, {
      errors: action.errors
    });
  default:
    return state;
  }
}
