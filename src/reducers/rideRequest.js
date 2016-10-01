import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: []
}

export default function ridesDriver(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_DRIVER_REQUEST:
    return {
      ...state,
      isFetching: true
    };
  case types.RIDES_DRIVER_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items
    };
  default:
    return state;
  }
}
