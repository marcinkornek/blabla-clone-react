import {
  RIDE_REQUEST,
  RIDE_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CHANGE_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  places: undefined,
  item: undefined,
}

export default function ride(state = initialState, action) {
  switch (action.type) {
  case RIDE_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case RIDE_SUCCESS:
    action.item.start_date = new Date(action.item.start_date)
    return {
      ...state,
      isFetching: false,
      item: action.item,
      places: action.item.free_places_count
    };
  case RIDE_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case RIDE_UPDATE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      item: action.item,
      places: action.item.free_places_count
    };
  case RIDE_REQUEST_CREATE_SUCCESS:
    return {
      ...state,
      item: action.item,
      places: action.places
    };
  case RIDE_REQUEST_CHANGE_SUCCESS:
    return {
      ...state,
      item: action.item,
      places: action.places
    };
  default:
    return state;
  }
}
