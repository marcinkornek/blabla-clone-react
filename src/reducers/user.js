import * as types from '../constants/ActionTypes'

const initialState = {
  errors: [],
  isSaving: false,
  isFetching: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_USER_REQUEST:
    return {
      ...state,
      errors: [],
      isFetching: true
    };
  case types.FETCH_USER_SUCCESS:
    action.item.date_of_birth = new Date(action.item.date_of_birth)
    return {
      ...state,
      isFetching: false,
      ...action.item
    };
  case types.FETCH_USER_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  default:
    return state;
  }
}
