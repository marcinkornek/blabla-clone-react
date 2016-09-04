import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  colors: [],
  comforts: [],
  categories: []
}

export default function carsOptions(state = initialState, action) {
  switch (action.type) {
  case types.CARS_OPTIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.CARS_OPTIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      ...action.item
    });
  default:
    return state;
  }
}
