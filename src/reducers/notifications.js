import {
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_UPDATE_SUCCESS,
} from '../constants/ActionTypes'

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function notifications(state = initialState, action) {
  switch (action.type) {
  case NOTIFICATIONS_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case NOTIFICATIONS_FETCH_SUCCESS:
    let items = action.payload.data.items
    let pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: items,
      pagination: pagination
    };
  case NOTIFICATION_ADD_SUCCESS:
    let addedItem = action.item
    let unreadCount = addedItem.unread_count
    delete addedItem['unread_count']
    return {
      ...state,
      items: [...state.items, addedItem],
      pagination: {
        ...state.pagination,
        unread_count: unreadCount
      }
    };
  case NOTIFICATION_UPDATE_SUCCESS:
    let updatedItem = action.payload.data
    return {
      ...state,
      isFetching: false,
      items: state.items.map(item => {
        if (item.id == updatedItem.id) {
          return {
            ...item,
            seen_at: updatedItem.seen_at
          }
        } else {
          return item
        }
      }),
      pagination: {
        ...state.pagination,
        unread_count: updatedItem.unread_count
      }
    };
  default:
    return state;
  }
}
