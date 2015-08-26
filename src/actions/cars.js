import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchCars(userId, session) {
  return dispatch => {
    dispatch(carsRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + userId + '/cars', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carsSuccess(json)))
    .catch(errors => dispatch(carsFailure(errors)))
  };
}

export function carsRequest() {
  return {
    type: types.CARS_REQUEST,
  };
}

export function carsSuccess(json) {
  return {
    type: types.CARS_SUCCESS,
    cars: json
  }
}

export function carsFailure(errors) {
  return {
    type: types.CARS_FAILURE,
    errors: errors
  }
}
