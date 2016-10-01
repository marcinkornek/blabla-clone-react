import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  pagination: {}
}

export default function ridesPassenger(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_PASSENGER_REQUEST:
    return {
      ...state,
      isFetching: true
    };
  case types.RIDES_PASSENGER_SUCCESS:
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
