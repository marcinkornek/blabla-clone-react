import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function users(state = initialState, action) {
  switch (action.type) {
  case USERS_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case USERS_FETCH_SUCCESS:
    let items = action.payload.data.items
    let pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: items,
      pagination: pagination
    };
  default:
    return state;
  }
}
