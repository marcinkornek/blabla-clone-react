import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  rides: [],
  pagination: []
}

export default function rides(state = initialState, action) {
  switch (action.type) {
  case types.RIDES_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.RIDES_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      rides: action.rides,
      pagination: action.pagination
    });
  default:
    return state;
  }
}
