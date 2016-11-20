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
  switch (action.type) {
  case CAR_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case CAR_FETCH_SUCCESS:
    let item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: item
    };
  case CAR_INITIALIZE:
    return initialState;
  case CAR_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case CAR_UPDATE_SUCCESS:
    let itemUpdate = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: itemUpdate
    };
  default:
    return state;
  }
}
