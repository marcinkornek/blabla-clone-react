import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
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
      items: action.items,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
