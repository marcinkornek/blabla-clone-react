import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  users: [],
  pagination: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
  case types.USERS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.USERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      users: action.users,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
