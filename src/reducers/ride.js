import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false,
  places: undefined
}

export default function ride(state = initialState, action) {
  switch (action.type) {
  case types.RIDE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDE_SUCCESS:
    action.item.start_date = new Date(action.item.start_date)
    action.item.user_ride_request = action.item.user_ride_request || {}
    return Object.assign({}, state, {
      isFetching: false,
      ...action.item,
      places: action.item.free_places_count
    });
  case types.RIDE_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.RIDE_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      ...action.item,
      places: action.item.free_places_count
    });
  case types.RIDE_REQUEST_CREATE_SUCCESS:
    return Object.assign({}, state, {
      ...action.item,
      places: action.places
    });
  case types.RIDE_REQUEST_CHANGE_SUCCESS:
    return Object.assign({}, state, {
      ...action.item,
      places: action.places
    });
  default:
    return state;
  }
}
