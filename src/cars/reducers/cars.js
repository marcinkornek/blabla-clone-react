import {
  CARS_FETCH_REQUEST,
  CARS_FETCH_SUCCESS,
} from '../action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function cars(state = initialState, action) {
  let items, pagination
  switch (action.type) {
  case CARS_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case CARS_FETCH_SUCCESS:
    items = action.payload.data.items
    pagination = action.payload.data.meta
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
