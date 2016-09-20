import * as types from '../constants/ActionTypes'

const initialState = {
  errors: [],
  isSaving: false,
  isFetching: false
}

export default function currentUser(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_CURRENT_USER_REQUEST:
    return Object.assign({}, state, {
      errors: [],
      isFetching: true
    });
  case types.FETCH_CURRENT_USER_SUCCESS:
    action.item.date_of_birth = new Date(action.item.date_of_birth)
    return Object.assign({}, state, {
      isFetching: false,
      ...action.item
    });
  case types.FETCH_CURRENT_USER_FAILURE:
    return Object.assign({}, state, {
      isFetching: false
    });
  case types.CURRENT_USER_UPDATE_REQUEST:
    return Object.assign({}, state, {
      isSaving: true
    });
  case types.CURRENT_USER_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      isSaving: false,
      ...action.item,
      errors: []
    });
  case types.CURRENT_USER_UPDATE_FAILURE:
    return Object.assign({}, state, {
      isSaving: false,
      errors: action.errors
    });
  default:
    return state;
  }
}
