import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  car: {}
}

export default function car(state = initialState, action) {
  switch (action.type) {
  case types.CAR_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.CAR_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      car: action.car
    });
  case types.CAR_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      car: action.car
    });
  default:
    return state;
  }
}
