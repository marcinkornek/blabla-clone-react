import * as types from '../constants/ActionTypes'

const initialState = {
  item: undefined,
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
}

export default function user(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_USER_REQUEST:
    return {
      ...state,
      errors: [],
      isStarted: true,
      isFetching: true,
    };
  case types.FETCH_USER_SUCCESS:
    action.item.date_of_birth = new Date(action.item.date_of_birth)
    return {
      ...state,
      isFetching: false,
      item: action.item,
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
