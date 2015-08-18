import * as types from '../constants/ActionTypes'

const initialState = {
  users: {
    isFetching: false,
    items: []
  }
}

export default function users(state = initialState, action) {
  switch (action.type) {
  case types.REQUEST_USERS:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RECEIVE_USERS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.users
    });
  default:
    return state;
  }
}
