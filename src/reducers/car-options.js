import {
  CAR_OPTIONS_FETCH_REQUEST,
  CAR_OPTIONS_FETCH_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  colors: [],
  comforts: [],
  categories: []
}

export function carOptions(state = initialState, action) {
  switch (action.type) {
  case CAR_OPTIONS_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case CAR_OPTIONS_FETCH_SUCCESS:
    let item = action.payload.data
    return {
      ...state,
      isFetching: false,
      ...item
    };
  default:
    return state;
  }
}
