import {
  RIDES_REQUEST,
  RIDES_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {},
  filters: {}
}

export default function rides(state = initialState, action) {
  switch (action.type) {
  case RIDES_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      pagination: action.pagination,
      filters: action.filters
    };
  default:
    return state;
  }
}
