import 'whatwg-fetch'
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

// fetch paginated users list
export function fetchUsers(page = 1, per = 10) {
  return dispatch => {
    dispatch(fetchUsersRequest())
    return fetch(APIEndpoints.USERS + '?page=' + page + '&per=' + per, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(fetchUsersSuccess(json)))
    .catch(errors => dispatch(fetchUsersFailure(errors)))
  }
}

// fetch user show profile with cars and rides_as_driver
export function fetchUser(userId) {
  return dispatch => {
    dispatch(fetchUserRequest())
    return fetch(APIEndpoints.USERS + '/' + userId, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(errors => dispatch(fetchUserFailure(errors)))
  }
}

// fetch current user profile
export function fetchCurrentUser() {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(fetchCurrentUserRequest())
    return fetch(APIEndpoints.USERS + '/' + session.id + '/profile', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(fetchCurrentUserSuccess(json)))
    .catch(errors => dispatch(fetchCurrentUserFailure(errors)))
  }
}

// create new user
export function createUser(body) {
  return dispatch => {
    dispatch(userCreateRequest())
    return fetch(APIEndpoints.USERS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
      },
      body: body
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userCreateSuccess(json)))
    .catch(errors => dispatch(userCreateFailure(errors)))
  }
}

// update current user profile
export function updateCurrentUser(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(currentUserUpdateRequest())
    return fetch(APIEndpoints.USERS + '/' + session.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: body
    })
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (response.ok) {
        dispatch(currentUserUpdateSuccess(JSON.parse(text), session))
      } else {
        return Promise.reject(text)
      }
    })
    .catch(errors => dispatch(currentUserUpdateFailure(JSON.parse(errors))))
  }
}

// checks email uniqueness
export function checkUserEmailUniqueness(email) {
  return (dispatch, getState) => {
    const { session } = getState()
    return fetch(APIEndpoints.USERS + '/check_if_unique?email=' + email, {
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
  }
}

export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export function fetchUsersSuccess(json) {
  return {
    type: FETCH_USERS_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function fetchUsersFailure(errors) {
  return {
    type: FETCH_USERS_FAILURE,
    errors: errors
  }
}

export function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST
  }
}

export function fetchUserSuccess(json) {
  return {
    type: FETCH_USER_SUCCESS,
    item: json
  }
}

export function fetchUserFailure(errors) {
  return {
    type: FETCH_USER_FAILURE,
    errors: errors
  }
}

export function fetchCurrentUserRequest() {
  return {
    type: FETCH_CURRENT_USER_REQUEST
  }
}

export function fetchCurrentUserSuccess(json) {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    item: json
  }
}

export function fetchCurrentUserFailure(errors) {
  return {
    type: FETCH_CURRENT_USER_FAILURE,
    errors: errors
  }
}

export function userCreateRequest() {
  return {
    type: USER_CREATE_REQUEST
  }
}

export function userCreateSuccess(json) {
  return {
    type: USER_CREATE_SUCCESS,
    item: json
  }
}

export function userCreateFailure(errors) {
  return {
    type: USER_CREATE_FAILURE,
    errors: errors
  }
}

export function currentUserUpdateRequest() {
  return {
    type: CURRENT_USER_UPDATE_REQUEST
  }
}

export function currentUserUpdateSuccess(json, session) {
  return {
    type: CURRENT_USER_UPDATE_SUCCESS,
    item: json,
    session: session
  }
}

export function currentUserUpdateFailure(errors) {
  return {
    type: CURRENT_USER_UPDATE_FAILURE,
    errors: errors
  }
}
