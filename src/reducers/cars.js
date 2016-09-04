import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  pagination: []
}

export default function cars(state = initialState, action) {
  switch (action.type) {
  case types.CARS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.CARS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
