import * as types from '../constants/ActionTypes'

const initialState = {
  errors: [],
  isFetching: false,
  isLoggedIn: false,
  user: {
    id:           undefined,
    email:        undefined,
    access_token: undefined,
    permission:   undefined
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
        id:           action['id'],
        email:        action['email'],
        access_token: action['access_token'],
        permission:   action['role']
      }
    });
  case types.LOGIN_FAILURE:
    return Object.assign({}, state, {
      errors: [action.errors],
      isFetching: false,
      isLoggedIn: false,
      user: {
        id:           undefined,
        email:        undefined,
        access_token: undefined,
        permission:   undefined
      }
    });
  case types.LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      errors: [],
      isFetching: false,
      isLoggedIn: false,
      user: {
        id:           undefined,
        email:        undefined,
        access_token: undefined,
        permission:   undefined
      }
    });
  case types.USER_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      user: {
        id: action.session.id,
        access_token: action.session.access_token,
        email: action.user.email,
      }
    });

  default:
    return state;
  }
}
