// TODO use one reducer for fetching all rides
import {
  RIDES_PASSENGER_FETCH_REQUEST,
  RIDES_PASSENGER_FETCH_SUCCESS,
} from '../action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function ridesPassenger(state = initialState, action) {
  let items, pagination
  switch (action.type) {
  case RIDES_PASSENGER_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_PASSENGER_FETCH_SUCCESS:
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
