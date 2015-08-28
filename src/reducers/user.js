import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving:   false,
  isFetching: false,
  user: {}
}

export default function user(state = initialState, action) {
  switch (action.type) {
  case types.USER_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.USER_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      user: action.user
    });
  case types.USER_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.USER_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      user: action.user
    });
  default:
    return state;
  }
}
