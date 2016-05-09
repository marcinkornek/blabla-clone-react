import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchCars(userId, page = 1, per = 10) {
  return dispatch => {
    dispatch(carsRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + userId + '/cars?page=' + page + '&per=' + per, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carsSuccess(json)))
    .catch(errors => dispatch(carsFailure(errors)))
  };
}

export function fetchCar(carId) {
  return dispatch => {
    dispatch(carRequest());
    return fetch(cons.APIEndpoints.CARS + '/' + carId, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carSuccess(json)))
    .catch(errors => dispatch(carFailure(errors)))
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

export function createCar(router, body, session) {
  return dispatch => {
    dispatch(carCreateRequest());
    return fetch(cons.APIEndpoints.CARS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: body
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carCreateSuccess(router, json)))
    .catch(errors => dispatch(carCreateFailure(errors)))
  };
}

export function updateCar(router, body, id, session) {
  return dispatch => {
    console.log(body);
    dispatch(carUpdateRequest());
    return fetch(cons.APIEndpoints.CARS + '/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
      },
      body: body
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carUpdateSuccess(router, json)))
    .catch(errors => dispatch(carUpdateFailure(errors)))
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
    cars: json.cars,
    pagination: json.meta
  }
}

export function carsFailure(errors) {
  return {
    type: types.CARS_FAILURE,
    errors: errors
  }
}

export function carRequest() {
  return {
    type: types.CAR_REQUEST,
  };
}

export function carSuccess(json) {
  return {
    type: types.CAR_SUCCESS,
    car: json
  }
}

export function carFailure(errors) {
  return {
    type: types.CAR_FAILURE,
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
    type: types.CAR_CREATE_REQUEST,
  };
}

export function carCreateSuccess(router, json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CAR_CREATE_SUCCESS,
      car: json
    });
    router.replace('/account/cars')
  };
}

export function carCreateFailure(errors) {
  return {
    type: types.CAR_CREATE_FAILURE,
    errors: errors
  }
}

export function carUpdateRequest() {
  return {
    type: types.CAR_UPDATE_REQUEST,
  };
}

export function carUpdateSuccess(router, json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CAR_UPDATE_SUCCESS,
      car: json
    });
    router.replace('/account/cars')
  };
}

export function carUpdateFailure(errors) {
  return {
    type: types.CAR_UPDATE_FAILURE,
    errors: errors
  }
}
