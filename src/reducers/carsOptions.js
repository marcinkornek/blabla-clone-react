import {
  CARS_OPTIONS_REQUEST,
  CARS_OPTIONS_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  colors: [],
  comforts: [],
  categories: []
}

export default function carsOptions(state = initialState, action) {
  switch (action.type) {
  case CARS_OPTIONS_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case CARS_OPTIONS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      ...action.item
    };
  default:
    return state;
  }
}
