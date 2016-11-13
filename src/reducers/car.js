import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export default function car(state = initialState, action) {
  switch (action.type) {
  case types.CAR_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case types.CAR_SUCCESS:
    return {
      ...state,
      isFetching: false,
      item: action.item
    };
  case types.CAR_INITIALIZE:
    return initialState;
  case types.CAR_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case types.CAR_UPDATE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      item: action.item
    };
  default:
    return state;
  }
}
