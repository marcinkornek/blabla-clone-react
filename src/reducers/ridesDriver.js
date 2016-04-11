import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  rides: [],
  pagination: []
}

export default function ridesDriver(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_DRIVER_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDES_DRIVER_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      rides: action.rides,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
