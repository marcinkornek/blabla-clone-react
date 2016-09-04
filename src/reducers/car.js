import * as types from '../constants/ActionTypes'

const initialState = {
  isSaving: false,
  isFetching: false
}

export default function car(state = initialState, action) {
  switch (action.type) {
  case types.CAR_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.CAR_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      ...action.item
    });
  case types.CAR_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.CAR_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      ...action.item
    });
  default:
    return state;
  }
}
