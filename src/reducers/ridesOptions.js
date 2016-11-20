import {
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  currencies: [],
  cars: []
}

export function ridesOptions(state = initialState, action) {
  switch (action.type) {
  case RIDE_OPTIONS_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDE_OPTIONS_FETCH_SUCCESS:
    let item = action.payload.data
    return {
      ...state,
      isFetching: false,
      ...item
    };
  default:
    return state;
  }
}
