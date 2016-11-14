import {
  CAR_REQUEST,
  CAR_SUCCESS,
  CAR_INITIALIZE,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export default function car(state = initialState, action) {
  switch (action.type) {
  case CAR_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case CAR_SUCCESS:
    return {
      ...state,
      isFetching: false,
      item: action.item
    };
  case CAR_INITIALIZE:
    return initialState;
  case CAR_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case CAR_UPDATE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      item: action.item
    };
  default:
    return state;
  }
}
