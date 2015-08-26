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

export function fetchCarsOptions() {
  return dispatch => {
    dispatch(carsOptionsRequest());
    return fetch(cons.APIEndpoints.CARS + '/options', {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carsOptionsSuccess(json)))
    .catch(errors => dispatch(carsOptionsFailure(errors)))
  };
}

export function createCar(car, session) {
  return dispatch => {
    dispatch(carCreateRequest());
    return fetch(cons.APIEndpoints.CARS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: JSON.stringify({
        'brand': car["brand"],
        'model': car["model"],
        'production_year': car["production_year"],
        'places': car["places"],
        'color': car["color"],
        'comfort': car["comfort"],
        'category': car["category"],
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carCreateSuccess(json)))
    .catch(errors => dispatch(carCreateFailure(errors)))
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

export function carsOptionsRequest() {
  return {
    type: types.CARS_OPTIONS_REQUEST,
  };
}

export function carsOptionsSuccess(json) {
  return {
    type: types.CARS_OPTIONS_SUCCESS,
    carsOptions: json
  }
}

export function carsOptionsFailure(errors) {
  return {
    type: types.CARS_OPTIONS_FAILURE,
    errors: errors
  }
}

export function carCreateRequest() {
  return {
    type: types.CARS_CREATE_REQUEST,
  };
}

export function carCreateSuccess(json) {
  return {
    type: types.CARS_CREATE_SUCCESS,
    cars: json
  }
}

export function carCreateFailure(errors) {
  return {
    type: types.CARS_CREATE_FAILURE,
    errors: errors
  }
}
