import {
  RIDES_SEARCH_FORM
} from '../constants/ActionTypes'

const initialState = {
  data: undefined
}

export default function ridesSearch(state = initialState, action) {
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
