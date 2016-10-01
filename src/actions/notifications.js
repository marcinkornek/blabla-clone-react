import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchNotifications(page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(userNotificationsRequest())
    return fetch(cons.APIEndpoints.NOTIFICATIONS + '?page=' + page + '&per=' + per, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userNotificationsSuccess(json)))
    .catch(errors => dispatch(userNotificationsFailure(errors)))
  }
}

export function markNotificationAsSeen(notificationId) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(userNotificationUpdateRequest())
    return fetch(cons.APIEndpoints.NOTIFICATIONS + '/' + notificationId + '/mark_as_seen', {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      }
    })
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (response.ok) {
        dispatch(userNotificationUpdateSuccess(JSON.parse(text)))
      } else {
        return Promise.reject(text)
      }
    })
    .catch(errors => dispatch(userNotificationUpdateFailure(JSON.parse(errors))))
  }
}

export function userNotificationAdd(notification) {
  return {
    type: types.USER_NOTIFICATION_ADD_SUCCESS,
    item: notification
  }
}

export function userNotificationsRequest() {
  return {
    type: types.USER_NOTIFICATIONS_REQUEST,
  }
}

export function userNotificationsSuccess(json) {
  return {
    type: types.USER_NOTIFICATIONS_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function userNotificationsFailure(errors) {
  return {
    type: types.USER_NOTIFICATIONS_FAILURE,
    errors: errors
  }
}

export function userNotificationUpdateRequest() {
  return {
    type: types.USER_NOTIFICATION_UPDATE_REQUEST,
  }
}

export function userNotificationUpdateSuccess(json) {
  return {
    type: types.USER_NOTIFICATION_UPDATE_SUCCESS,
    item: json
  }
}

export function userNotificationUpdateFailure(errors) {
  return {
    type: types.USER_NOTIFICATION_UPDATE_FAILURE,
    errors: errors
  }
}
