import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  pagination: []
}

export default function notifications(state = initialState, action) {
  switch (action.type) {
  case types.USER_NOTIFICATIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.USER_NOTIFICATIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
