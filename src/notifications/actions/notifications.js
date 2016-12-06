import axios from 'axios'
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

export function fetchNotifications(page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [NOTIFICATIONS_FETCH_REQUEST, NOTIFICATIONS_FETCH_SUCCESS, NOTIFICATIONS_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.NOTIFICATIONS,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          params: {
            page,
            per,
          }
        }
      }
    })
  }
}

export function markNotificationAsSeen(notificationId) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [NOTIFICATION_UPDATE_REQUEST, NOTIFICATION_UPDATE_SUCCESS, NOTIFICATION_UPDATE_FAILURE],
      payload: {
        request: {
          method: 'put',
          url: `${APIEndpoints.NOTIFICATIONS}/${notificationId}/mark_as_seen`,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function userNotificationAdd(notification) {
  return {
    type: NOTIFICATION_ADD_SUCCESS,
    item: notification
  }
}
