import {
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CHANGE_SUCCESS,
} from '../action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export function ride(state = initialState, action) {
  let item
  switch (action.type) {
  case RIDE_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case RIDE_FETCH_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        start_date: new Date(item.start_date)
      }
    };
  case RIDE_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case RIDE_UPDATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: {
        ...item,
        start_date: new Date(item.start_date)
      }
    };
  case RIDE_REQUEST_CREATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      item: {
        ...item,
        start_date: new Date(item.start_date)
      }
    };
  case RIDE_REQUEST_CHANGE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      item: {
        ...item,
        start_date: new Date(item.start_date)
      }
    };
  default:
    return state;
  }
}
