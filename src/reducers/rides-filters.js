import {
  RIDE_FILTER_UPDATE,
  RIDE_FILTER_CLEAR,
  RIDE_SEARCH_UPDATE,
  RIDE_SEARCH_CLEAR,
} from '../constants/ActionTypes'

export const initialState = {
  filters: {},
  search: {},
};

export function ridesFilters(state = initialState, action) {
  switch (action.type) {
  case RIDE_FILTER_UPDATE:
    return {
      ...state,
      filters: action.filters
    };
  case RIDE_SEARCH_UPDATE:
    return {
      ...state,
      search: action.search
    };
  case RIDE_FILTER_CLEAR:
    return {
      ...state,
      filters: {}
    };
  case RIDE_SEARCH_CLEAR:
    return {
      ...state,
      search: {}
    };
  default:
    return state;
  }
};
