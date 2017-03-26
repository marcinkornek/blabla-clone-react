import {
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
  CAR_INITIALIZE,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export function car(state = initialState, action) {
  let item
  switch (action.type) {
  case CAR_INITIALIZE:
    return initialState;
  case CAR_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case CAR_FETCH_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: item
    };
  case CAR_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case CAR_UPDATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: item
    };
  default:
    return state;
  }
}
