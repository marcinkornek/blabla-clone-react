import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
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
  case RIDES_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_FETCH_SUCCESS:
    let items = action.payload.data.items
    let pagination = action.payload.data.meta
    let filters = action.payload.data.filters
    return {
      ...state,
      isFetching: false,
      items: items,
      pagination: pagination,
      filters: filters
    };
  default:
    return state;
  }
}
