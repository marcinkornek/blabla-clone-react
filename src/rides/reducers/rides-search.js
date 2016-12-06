import {
  RIDES_SEARCH_FORM
} from '../action-types'

export const initialState = {
  data: undefined
}

export function ridesSearch(state = initialState, action) {
  switch (action.type) {
  case RIDES_SEARCH_FORM:
    return {
      ...state,
      data: action.data
    };
  default:
    return state;
  }
}
