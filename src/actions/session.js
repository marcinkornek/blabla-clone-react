import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons from '../constants/constants'
import * as usersActions from './users'
import * as notificationsActions from './notifications'
import { push } from 'react-router-redux'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function loginFromCookie(data) {
  return dispatch => {
    dispatch(loginRequest())
    return fetch(cons.APIEndpoints.SESSIONS + '/get_user', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': data.email,
        'X-User-Token': data.access_token
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(loginSuccess(json)))
    .catch(errors => dispatch(loginFailure(errors)))
  }
}

export function logInEmailBackend(body) {
  return dispatch => {
    dispatch(loginRequest())
    return fetch(cons.APIEndpoints.LOGIN_EMAIL, {
    	method: 'post',
    	headers: {
    		'Accept': 'application/vnd.blabla-clone-v1+json',
    	},
		  body: body
    })
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (response.ok) {
        dispatch(loginSuccess(JSON.parse(text)))
      } else {
        return Promise.reject(text)
      }
    })
    .catch(errors => dispatch(loginFailure(JSON.parse(errors))))
  }
}

export function logInFbBackend(fbResponse) {
  return dispatch => {
    dispatch(loginRequest())
    return fetch(cons.APIEndpoints.LOGIN_FB, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'uid':        fbResponse.id,
        'provider':   'facebook',
        'email':      fbResponse.email,
        'first_name': fbResponse.first_name,
        'last_name':  fbResponse.last_name,
      })
    })
    .then(req => req.json())
    .then(json => dispatch(loginSuccess(json)))
    .catch(errors => dispatch(loginFailure(errors)))
  }
}

export function logout() {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(logoutRequest())
    return fetch(cons.APIEndpoints.SESSIONS, {
      method: 'delete',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: JSON.stringify({
        'access_token': session.access_token,
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(logoutSuccess(json)))
    .catch(errors => dispatch(logoutFailure(errors)))
  }
}

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  }
}

export function loginSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGIN_SUCCESS,
      item: json
    })
    dispatch(usersActions.fetchCurrentUser())
    dispatch(notificationsActions.fetchNotifications())
    window.cable = ActionCable.createConsumer(`${cons.ActionCableURL}?email=${json.email}&token=${json.access_token}`)
    saveToLocalStorage(json)
    dispatch(push('/'))
  }
}

export function loginFailure(errors) {
  return {
    type: types.LOGIN_FAILURE,
    errors: errors.error
  }
}

export function logoutRequest() {
  return {
    type: types.LOGOUT_REQUEST
  }
}

export function logoutSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGOUT_SUCCESS
    })
    localStorage.clear()
    dispatch(push('/'))
  }
}

export function logoutFailure(errors) {
  return {
    type: types.LOGOUT_FAILURE,
    errors: errors
  }
}

function saveToLocalStorage(json) {
  localStorage.setItem('email', json.email)
  localStorage.setItem('access_token', json.access_token)
}
