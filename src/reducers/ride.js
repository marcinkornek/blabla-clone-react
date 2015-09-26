import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false,
  ride: {},
  places: undefined
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
      ride: action.ride,
      places: action.ride.free_places_count
    });
  case types.RIDE_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.RIDE_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      ride: action.ride,
      places: action.ride.free_places_count
    });
  case types.RIDE_REQUEST_CREATE_SUCCESS:
    return Object.assign({}, state, {
      ride: action.ride,
      places: action.places
    });
  case types.RIDE_REQUEST_CHANGE_SUCCESS:
    return Object.assign({}, state, {
      ride: action.ride,
      places: action.places
    });
  default:
    return state;
  }
}
