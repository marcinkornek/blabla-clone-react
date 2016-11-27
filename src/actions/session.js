import axios from 'axios'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

export function loginFromCookie(data) {
  return (dispatch, getState) => {
    return dispatch({
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      payload: {
        request: {
          url: `${APIEndpoints.SESSIONS}/get_user`,
          headers: {
            'X-User-Email': data.email,
            'X-User-Token': data.access_token
          }
        }
      }
    })
  }
}

export function logInEmailBackend(data) {
  return (dispatch, getState) => {
    return dispatch({
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.LOGIN_EMAIL,
          data: data
        }
      }
    })
  }
}

export function logInFbBackend(data) {
  return (dispatch, getState) => {
    return dispatch({
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.LOGIN_FB,
          data: {
            uid: data.id,
            provider: 'facebook',
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
          }
        }
      }
    })
  }
}

export function logout() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
      payload: {
        request: {
          method: 'delete',
          url: APIEndpoints.SESSIONS,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function saveToLocalStorage(email, access_token) {
  return () => {
    localStorage.setItem('email', email)
    localStorage.setItem('access_token', access_token)
  }
}
