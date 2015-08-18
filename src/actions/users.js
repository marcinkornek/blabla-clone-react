import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchUsers() {
  return dispatch => {
    dispatch(usersRequest());
    return fetch(cons.APIEndpoints.USERS, {
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

export function usersRequest() {
  return {
    type: types.USERS_REQUEST,
  };
}

export function usersSuccess(json) {
  console.log('json', json);
  return {
    type: types.USERS_SUCCESS,
    items: json
  }
}

export function usersFailure(errors) {
  return {
    type: types.USERS_FAILURE,
    errors: errors
  }
}