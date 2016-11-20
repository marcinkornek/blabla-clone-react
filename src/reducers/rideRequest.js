import {
  RIDES_DRIVER_FETCH_REQUEST,
  RIDES_DRIVER_FETCH_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: []
}

export function ridesDriver(state = initialState, action) {
  switch (action.type) {
  case RIDES_DRIVER_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_DRIVER_FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items
    };
  default:
    return state;
  }
}
