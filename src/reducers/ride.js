import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false,
  places: undefined
}

const emptyRide = {
  user_ride_request: {},
  requested: false,
  ride_requests: undefined
}

export default function ride(state = initialState, action) {
  switch (action.type) {
  case types.RIDE_REQUEST:
    return {
      ...state,
      isFetching: true
    };
  case types.RIDE_SUCCESS:
    action.item.start_date = new Date(action.item.start_date)
    return {
      ...state,
      isFetching: false,
      ...emptyRide,
      ...action.item,
      places: action.item.free_places_count
    };
  case types.RIDE_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case types.RIDE_UPDATE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      ...action.item,
      places: action.item.free_places_count
    };
  case types.RIDE_REQUEST_CREATE_SUCCESS:
    return {
      ...state,
      ...action.item,
      places: action.places
    };
  case types.RIDE_REQUEST_CHANGE_SUCCESS:
    return {
      ...state,
      ...action.item,
      places: action.places
    };
  default:
    return state;
  }
}
