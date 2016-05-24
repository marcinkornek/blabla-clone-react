import * as types from '../constants/ActionTypes'

const initialState = {
  data: undefined
}

export default function ridesSearch(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_SEARCH_FORM:
    console.log('RIDES_SEARCH_FORM');
    return Object.assign({}, state, {
      data: action.data
    });
  default:
    return state;
  }
}
