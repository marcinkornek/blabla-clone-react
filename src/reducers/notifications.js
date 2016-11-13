import * as types from '../constants/ActionTypes'

const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export default function notifications(state = initialState, action) {
  switch (action.type) {
  case types.USER_NOTIFICATIONS_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case types.USER_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      pagination: action.pagination
    };
  case types.USER_NOTIFICATION_ADD_SUCCESS:
    let unreadCount = action.item.unread_count
    delete action.item['unread_count']
    return {
      ...state,
      items: [...state.items, action.item],
      pagination: {
        ...state.pagination,
        unread_count: unreadCount
      }
    };
  case types.USER_NOTIFICATION_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      items: state.items.map(item => {
        if (item.id == action.item.id) {
          return {
            ...item,
            seen_at: action.item.seen_at
          }
        } else {
          return item
        }
      }),
      pagination: {
        ...state.pagination,
        unread_count: action.item.unread_count
      }
    };
  default:
    return state;
  }
}
