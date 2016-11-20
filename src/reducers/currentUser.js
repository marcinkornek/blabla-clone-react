import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
}

export function currentUser(state = initialState, action) {
  let item
  switch (action.type) {
  case CURRENT_USER_FETCH_REQUEST:
    return {
      ...state,
      errors: [],
      isStarted: true,
      isFetching: true,
    };
  case CURRENT_USER_FETCH_SUCCESS:
    item = action.payload.data
    item.date_of_birth = new Date(item.date_of_birth)
    return {
      ...state,
      isFetching: false,
      ...item
    };
  case CURRENT_USER_FETCH_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  case CURRENT_USER_UPDATE_REQUEST:
    return {
      ...state,
      isSaving: true
    };
  case CURRENT_USER_UPDATE_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      ...item,
      errors: []
    };
  case CURRENT_USER_UPDATE_FAILURE:
    return {
      ...state,
      isSaving: false,
      errors: action.errors
    };
  default:
    return state;
  }
}
