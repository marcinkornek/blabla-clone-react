import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchUsers(page = 1, per = 10) {
  return dispatch => {
    dispatch(usersRequest());
    return fetch(cons.APIEndpoints.USERS + '?page=' + page + '&per=' + per, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(usersSuccess(json)))
    .catch(errors => dispatch(usersFailure(errors)))
  };
}

export function fetchUser(userId) {
  return dispatch => {
    dispatch(userRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + userId, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userSuccess(json)))
    .catch(errors => dispatch(userFailure(errors)))
  };
}

export function fetchUserProfile(userId) {
  return dispatch => {
    dispatch(userRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + userId + '/profile', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userSuccess(json)))
    .catch(errors => dispatch(userFailure(errors)))
  };
}

export function createUser(user) {
  return dispatch => {
    dispatch(userCreateRequest());
    return fetch(cons.APIEndpoints.USERS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': user["first_name"],
        'last_name':  user["last_name"],
        'email':      user["email"],
        'tel_num':    user["tel_num"],
        'birth_year': user["birth_year"],
        'password':   user["password"],
        'password_confirmation': user["passwordConfirmation"]
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(userCreateSuccess(json)))
    .catch(errors => dispatch(userCreateFailure(errors)))
  };
}

export function updateUser(user, avatar, session) {
  return dispatch => {
    dispatch(userUpdateRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + user.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: JSON.stringify({
        'id':         user["id"],
        'first_name': user["first_name"],
        'last_name':  user["last_name"],
        'email':      user["email"],
        'tel_num':    user["tel_num"],
        'birth_year': user["birth_year"],
        'avatar':     avatar
      })
    })
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (response.ok) {
        dispatch(userUpdateSuccess(JSON.parse(text), session))
      } else {
        return Promise.reject(text)
      }
    })
    .catch(errors => dispatch(userUpdateFailure(JSON.parse(errors))))
  };
}

export function usersRequest() {
  return {
    type: types.USERS_REQUEST,
  };
}

export function usersSuccess(json) {
  return {
    type: types.USERS_SUCCESS,
    users: json.users,
    pagination: json.meta
  }
}

export function usersFailure(errors) {
  return {
    type: types.USERS_FAILURE,
    errors: errors
  }
}

export function userRequest() {
  return {
    type: types.USER_REQUEST,
  };
}

export function userSuccess(json) {
  return {
    type: types.USER_SUCCESS,
    user: json
  }
}

export function userFailure(errors) {
  return {
    type: types.USER_FAILURE,
    errors: errors
  }
}

export function userCreateRequest() {
  return {
    type: types.USER_CREATE_REQUEST,
  };
}

export function userCreateSuccess(json) {
  return {
    type: types.USER_CREATE_SUCCESS,
    user: json
  }
}

export function userCreateFailure(errors) {
  return {
    type: types.USER_CREATE_FAILURE,
    errors: errors
  }
}

export function userUpdateRequest() {
  return {
    type: types.USER_UPDATE_REQUEST,
  };
}

export function userUpdateSuccess(json, session) {
  return {
    type: types.USER_UPDATE_SUCCESS,
    user: json,
    session: session
  }
}

export function userUpdateFailure(errors) {
  return {
    type: types.USER_UPDATE_FAILURE,
    errors: errors
  }
}
