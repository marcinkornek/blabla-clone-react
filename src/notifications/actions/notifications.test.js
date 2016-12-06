import {
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_FETCH_FAILURE,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'
import {
  fetchNotifications,
  markNotificationAsSeen,
  userNotificationAdd,
} from './notifications'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'
import { itReturnsValidType, itReturnsValidObject } from 'test/helpers/action-helpers'
import { Notification } from 'test/support/fixtures'

describe('actions notifications', () => {
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({ session: { email: email, access_token: access_token }})

  describe('fetchNotifications', () => {
    describe('with no params', () => {
      const asyncAction = fetchNotifications()
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.NOTIFICATIONS,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 1,
          per: 10
        }
      }

      itIsAsyncAction(action, [
        NOTIFICATIONS_FETCH_REQUEST,
        NOTIFICATIONS_FETCH_SUCCESS,
        NOTIFICATIONS_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchNotifications(page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.NOTIFICATIONS,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page,
          per
        }
      }

      itIsAsyncAction(action, [
        NOTIFICATIONS_FETCH_REQUEST,
        NOTIFICATIONS_FETCH_SUCCESS,
        NOTIFICATIONS_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('markNotificationAsSeen', () => {
    const notificationId = 1
    const asyncAction = markNotificationAsSeen(notificationId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'put',
      url: `${APIEndpoints.NOTIFICATIONS}/${notificationId}/mark_as_seen`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      NOTIFICATION_UPDATE_REQUEST,
      NOTIFICATION_UPDATE_SUCCESS,
      NOTIFICATION_UPDATE_FAILURE,
    ])

    itCallsApi(action, opts)
  })

  describe('userNotificationAdd', () => {
    const notification = Notification()
    const action = userNotificationAdd(notification)

    itReturnsValidType(action, NOTIFICATION_ADD_SUCCESS)
    itReturnsValidObject(action, 'item', notification)
  })
})
