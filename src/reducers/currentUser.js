import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_CURRENT_USER_REQUEST:
    return {
      ...state,
      errors: [],
      isStarted: true,
      isFetching: true,
    };
  case types.FETCH_CURRENT_USER_SUCCESS:
    action.item.date_of_birth = new Date(action.item.date_of_birth)
    return {
      ...state,
      isFetching: false,
      ...action.item
    };
  case types.FETCH_CURRENT_USER_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  case types.CURRENT_USER_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case types.CURRENT_USER_UPDATE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      ...action.item,
      errors: []
    };
  case types.CURRENT_USER_UPDATE_FAILURE:
    return {
      ...state,
      isSaving: false,
      errors: action.errors
    };
  default:
    return state;
  }
}
