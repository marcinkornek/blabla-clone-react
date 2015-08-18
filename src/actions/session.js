import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function logInBackend(text) {
  return dispatch => {
    dispatch(loginRequest());
    return fetch(cons.APIEndpoints.LOGIN, {
    	method: 'post',
    	headers: {
    		'Accept': 'application/vnd.blabla-clone-v1+json',
    		'Content-Type': 'application/json'
    	},
		  body: JSON.stringify({
		  	'email': text["email"],
		  	'password': text["password"]
		  })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(loginSuccess(json)))
    .catch(errors => dispatch(loginFailure(errors)))
  };
}

export function loginRequest() {
  return {
    type: types.LOGIN_EMAIL_REQUEST,
  }
}

export function loginSuccess(json) {
  console.log('json', json);
	return {
    type: types.LOGIN_EMAIL_SUCCESS,
    email: json['email'],
    accessToken: json['access_token']
  }
}

export function loginFailure(errors) {
  return {
    type: types.LOGIN_EMAIL_FAILURE,
    errors: errors
  }
}