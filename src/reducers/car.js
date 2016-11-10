import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false,
  item: undefined,
}

export default function car(state = initialState, action) {
  switch (action.type) {
  case types.CAR_REQUEST:
    return {
      ...state,
      isFetching: true
    };
  case types.CAR_SUCCESS:
    return {
      ...state,
      isFetching: false,
      item: action.item
    };
  case types.CAR_INITIALIZE:
    console.log('initialState');
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
