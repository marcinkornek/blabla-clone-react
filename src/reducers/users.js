import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_USERS_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case types.FETCH_USERS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    };
  default:
    return state;
  }
}
