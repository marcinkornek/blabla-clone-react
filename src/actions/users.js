import axios from 'axios'
import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  CURRENT_USER_CREATE_REQUEST,
  CURRENT_USER_CREATE_SUCCESS,
  CURRENT_USER_CREATE_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

export function fetchUsers(page = 1, per = 10) {
  return {
    types: [
      USERS_FETCH_REQUEST,
      USERS_FETCH_SUCCESS,
      USERS_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: APIEndpoints.USERS,
        params: {
          page,
          per,
        }
      }
    }
  }
}

export function fetchUser(userId) {
  return {
    types: [
      USER_FETCH_REQUEST,
      USER_FETCH_SUCCESS,
      USER_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.USERS}/${userId}`,
      }
    }
  }
}

export function fetchCurrentUser() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        CURRENT_USER_FETCH_REQUEST,
        CURRENT_USER_FETCH_SUCCESS,
        CURRENT_USER_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.USERS}/${session.id}/profile`,
        }
      }
    })
  }
}
export function createUser(body) {
  return {
    types: [
      CURRENT_USER_CREATE_REQUEST,
      CURRENT_USER_CREATE_SUCCESS,
      CURRENT_USER_CREATE_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.USERS,
        data: body,
        simple: false
      }
    }
  }
}

export function updateCurrentUser(body) {
  return {
    types: [
      CURRENT_USER_UPDATE_REQUEST,
      CURRENT_USER_UPDATE_SUCCESS,
      CURRENT_USER_UPDATE_FAILURE
    ],
    payload: {
      request: {
        method: 'put',
        url: `${APIEndpoints.USERS}/${session.id}`,
        data: body,
        simple: false
      }
    }
  }
}

export function checkUserEmailUniqueness(email) {
  return (dispatch, getState) => {
    const { session } = getState()
    return axios({
      method: 'get',
      url: `${APIEndpoints.USERS}/check_if_unique?email=${email}`,
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      simple: false
    })
    .then(response => {
      return response.data
    })
  }
}
