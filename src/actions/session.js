import 'whatwg-fetch'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints, ActionCableURL } from '../constants/constants'
import { fetchCurrentUser } from './users'
import { fetchNotifications } from './notifications'
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
    return fetch(APIEndpoints.SESSIONS + '/get_user', {
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
    return fetch(APIEndpoints.LOGIN_EMAIL, {
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
    return fetch(APIEndpoints.LOGIN_FB, {
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
    return fetch(APIEndpoints.SESSIONS, {
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
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_SUCCESS,
      item: json
    })
    dispatch(fetchCurrentUser())
    dispatch(fetchNotifications())
    window.cable = ActionCable.createConsumer(`${ActionCableURL}?email=${json.email}&token=${json.access_token}`)
    saveToLocalStorage(json)
    dispatch(push('/'))
  }
}

export function loginFailure(errors) {
  return {
    type: LOGIN_FAILURE,
    errors: errors.error
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  }
}

export function logoutSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
    localStorage.clear()
    dispatch(push('/'))
  }
}

export function logoutFailure(errors) {
  return {
    type: LOGOUT_FAILURE,
    errors: errors
  }
}

function saveToLocalStorage(json) {
  localStorage.setItem('email', json.email)
  localStorage.setItem('access_token', json.access_token)
}
