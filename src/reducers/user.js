import * as types from '../constants/ActionTypes'

const initialState = {
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
  default:
    return state;
  }
}
