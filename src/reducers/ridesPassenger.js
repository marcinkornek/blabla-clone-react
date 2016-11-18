import {
  RIDES_PASSENGER_FETCH_REQUEST,
  RIDES_PASSENGER_FETCH_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export default function ridesPassenger(state = initialState, action) {
  switch (action.type) {
  case RIDES_PASSENGER_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_PASSENGER_FETCH_SUCCESS:
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
