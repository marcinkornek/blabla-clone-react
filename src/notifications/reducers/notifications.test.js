import {
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_UPDATE_SUCCESS,
} from '../action-types'
import { notifications, initialState } from './notifications'
import {
  Notification,
  Notification2,
  NotificationWithUnreadCount,
  PaginationWithUnreadCount
} from 'test/support/fixtures'

describe('reducers', () => {
  it('handles NOTIFICATIONS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {},
    }

    const state = notifications({
      ...initialState
    }, {
      type: NOTIFICATIONS_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles NOTIFICATIONS_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        items: [Notification()],
        meta: PaginationWithUnreadCount()
      }
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [Notification()],
      pagination: PaginationWithUnreadCount()
    }

    const state = notifications({
      ...initialState,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {},
    }, {
      type: NOTIFICATIONS_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles NOTIFICATION_ADD_SUCCESS', () => {
    let notification = NotificationWithUnreadCount()
    delete notification['unread_count']

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [Notification(), notification],
      pagination: PaginationWithUnreadCount()
    }

    const state = notifications({
      ...initialState,
      isStarted: true,
      isFetching: false,
      items: [Notification()],
      pagination: PaginationWithUnreadCount(),
    }, {
      type: NOTIFICATION_ADD_SUCCESS,
      item: NotificationWithUnreadCount()
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles NOTIFICATION_UPDATE_SUCCESS', () => {
    let notification2 = {
      ...Notification2(),
      seen_at: '2016-11-22T19:55:50.990Z',
      unread_count: 2
    }

    const payload = {
      data: notification2
    }

    notification2 = {
      ...Notification2(),
      seen_at: '2016-11-22T19:55:50.990Z'
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [Notification(), notification2],
      pagination: PaginationWithUnreadCount()
    }

    const state = notifications({
      ...initialState,
      isStarted: true,
      isFetching: false,
      items: [Notification(), Notification2()],
      pagination: PaginationWithUnreadCount(),
    }, {
      type: NOTIFICATION_UPDATE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
