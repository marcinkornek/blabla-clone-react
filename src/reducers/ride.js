import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false,
  ride: {}
}

export default function ride(state = initialState, action) {
  switch (action.type) {
  case types.RIDE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      ride: action.ride
    });
  case types.RIDE_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.RIDE_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      ride: action.ride
    });
  default:
    return state;
  }
}
