import {
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CHANGE_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  places: undefined,
  item: undefined,
}

export function ride(state = initialState, action) {
  switch (action.type) {
  case RIDE_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case RIDE_FETCH_SUCCESS:
    let item = action.payload.data
    item.start_date = new Date(item.start_date)
    return {
      ...state,
      isFetching: false,
      item: item,
      places: item.free_places_count
    };
  case RIDE_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case RIDE_UPDATE_SUCCESS:
    let updatedItem = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: updatedItem,
      places: updatedItem.free_places_count
    };
  case RIDE_REQUEST_CREATE_SUCCESS:
    let createdItem = action.payload.data
    return {
      ...state,
      item: createdItem,
      places: createdItem.free_places_count
    };
  case RIDE_REQUEST_CHANGE_SUCCESS:
    let changedItem = action.payload.data
    return {
      ...state,
      item: changedItem,
      places: changedItem.free_places_count
    };
  default:
    return state;
  }
}
