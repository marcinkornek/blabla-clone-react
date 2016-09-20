import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

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
    return fetch(cons.APIEndpoints.USERS + '?page=' + page + '&per=' + per, {
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
    return fetch(cons.APIEndpoints.USERS + '/' + userId, {
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
    return fetch(cons.APIEndpoints.USERS + '/' + session.id + '/profile', {
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
    return fetch(cons.APIEndpoints.USERS, {
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
    return fetch(cons.APIEndpoints.USERS + '/' + session.id, {
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
    return fetch(cons.APIEndpoints.USERS + '/check_if_unique?email=' + email, {
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
    type: types.FETCH_USERS_REQUEST
  }
}

export function fetchUsersSuccess(json) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function fetchUsersFailure(errors) {
  return {
    type: types.FETCH_USERS_FAILURE,
    errors: errors
  }
}

export function fetchUserRequest() {
  return {
    type: types.FETCH_USER_REQUEST
  }
}

export function fetchUserSuccess(json) {
  return {
    type: types.FETCH_USER_SUCCESS,
    item: json
  }
}

export function fetchUserFailure(errors) {
  return {
    type: types.FETCH_USER_FAILURE,
    errors: errors
  }
}

export function fetchCurrentUserRequest() {
  return {
    type: types.FETCH_CURRENT_USER_REQUEST
  }
}

export function fetchCurrentUserSuccess(json) {
  return {
    type: types.FETCH_CURRENT_USER_SUCCESS,
    item: json
  }
}

export function fetchCurrentUserFailure(errors) {
  return {
    type: types.FETCH_CURRENT_USER_FAILURE,
    errors: errors
  }
}

export function userCreateRequest() {
  return {
    type: types.USER_CREATE_REQUEST
  }
}

export function userCreateSuccess(json) {
  return {
    type: types.USER_CREATE_SUCCESS,
    item: json
  }
}

export function userCreateFailure(errors) {
  return {
    type: types.USER_CREATE_FAILURE,
    errors: errors
  }
}

export function currentUserUpdateRequest() {
  return {
    type: types.CURRENT_USER_UPDATE_REQUEST
  }
}

export function currentUserUpdateSuccess(json, session) {
  return {
    type: types.CURRENT_USER_UPDATE_SUCCESS,
    item: json,
    session: session
  }
}

export function currentUserUpdateFailure(errors) {
  return {
    type: types.CURRENT_USER_UPDATE_FAILURE,
    errors: errors
  }
}
