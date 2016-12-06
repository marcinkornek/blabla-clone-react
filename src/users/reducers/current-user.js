import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: {},
}

export function currentUser(state = initialState, action) {
  let item, errors
  switch (action.type) {
  case CURRENT_USER_FETCH_REQUEST:
    return {
      ...state,
      errors: {},
      isStarted: true,
      isFetching: true,
    };
  case CURRENT_USER_FETCH_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        date_of_birth: new Date(item.date_of_birth)
      }
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
      item: {
        ...item,
        date_of_birth: new Date(item.date_of_birth)
      },
      errors: {}
    };
  case CURRENT_USER_UPDATE_FAILURE:
    errors = action.error.response.data
    return {
      ...state,
      isSaving: false,
      errors: errors
    };
  default:
    return state;
  }
}
