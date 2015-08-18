import * as types from '../constants/ActionTypes'

const initialState = {
  users: {
    isFetching: false,
    items: []
  }
}

export default function users(state = initialState, action) {
  console.log('reducer action', action)
  switch (action.type) {
  case types.USERS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.USERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.items
    });
  default:
    return state;
  }
}
