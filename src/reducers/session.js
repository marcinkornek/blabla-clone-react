import * as types from '../constants/ActionTypes'

const initialState = {
  errors: [],
  isFetching: false,
  isLoggedIn: false,
  user: {
    email: undefined,
    accessToken: undefined,
    permissions: []
  }
}

export default function session(state = initialState, action) {
  switch (action.type) {
  case types.LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case types.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isLoggedIn: true,
      user: {
        email: action['email'],
        accessToken: action['accessToken'],
        permissions: ['user']
      }
    });
  case types.LOGIN_FAILURE:
    console.log(action)
    return Object.assign({}, state, {
      errors: [action.errors],
      isFetching: false,
      isLoggedIn: false,
      user: {
        email: undefined,
        accessToken: undefined,
        permissions: []
      }
    });
  case types.LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      errors: [],
      isFetching: false,
      isLoggedIn: false,
      user: {
        email: undefined,
        accessToken: undefined,
        permissions: []
      }
    });

  default:
    return state;
  }
}
