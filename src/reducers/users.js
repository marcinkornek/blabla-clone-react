import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  pagination: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_USERS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.FETCH_USERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
