import {
  CARS_REQUEST,
  CARS_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export default function cars(state = initialState, action) {
  switch (action.type) {
  case CARS_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case CARS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    };
  default:
    return state;
  }
}
