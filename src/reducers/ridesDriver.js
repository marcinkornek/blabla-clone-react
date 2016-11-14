import {
  RIDES_DRIVER_REQUEST,
  RIDES_DRIVER_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export default function ridesDriver(state = initialState, action) {
  switch (action.type) {
  case RIDES_DRIVER_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_DRIVER_SUCCESS:
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
