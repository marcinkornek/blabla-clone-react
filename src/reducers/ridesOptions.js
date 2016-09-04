import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  currencies: [],
  cars: []
}

export default function ridesOptions(state = initialState, action) {
  switch (action.type) {
  case types.RIDE_OPTIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDE_OPTIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      ...action.item
    });
  default:
    return state;
  }
}
