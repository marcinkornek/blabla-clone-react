import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  currencies: [],
  cars: []
}

export default function ridesOptions(state = initialState, action) {
  switch (action.type) {
  case types.RIDE_OPTIONS_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case types.RIDE_OPTIONS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      ...action.item
    };
  default:
    return state;
  }
}
