import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  pagination: []
}

export default function notifications(state = initialState, action) {
  switch (action.type) {
  case types.USER_NOTIFICATIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case types.USER_NOTIFICATIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    });
  case types.USER_NOTIFICATION_UPDATE_SUCCESS:
    var match = _.find(state.items, function(item) { return item.id === action.item.id })
    if (match) { match.seen_at = action.item.seen_at }
    return Object.assign({}, state, {
      isFetching: false,
      items: state.items
    });
  default:
    return state;
  }
}
