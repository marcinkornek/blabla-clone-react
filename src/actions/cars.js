import 'whatwg-fetch'
import {
  CAR_INITIALIZE,
  CARS_REQUEST,
  CARS_SUCCESS,
  CARS_FAILURE,
  CAR_REQUEST,
  CAR_SUCCESS,
  CAR_FAILURE,
  CARS_OPTIONS_REQUEST,
  CARS_OPTIONS_SUCCESS,
  CARS_OPTIONS_FAILURE,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAILURE,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'
import { push } from 'react-router-redux'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchCars(userId, page = 1, per = 10) {
  return dispatch => {
    dispatch(carsRequest())
    return fetch(APIEndpoints.USERS + '/' + userId + '/cars?page=' + page + '&per=' + per, {
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
  }
}

export function fetchCar(carId) {
  return dispatch => {
    dispatch(carRequest())
    return fetch(APIEndpoints.CARS + '/' + carId, {
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
  }
}

export function fetchCarsOptions() {
  return dispatch => {
    dispatch(carsOptionsRequest())
    return fetch(APIEndpoints.CARS + '/options', {
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
  }
}

export function createCar(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(carCreateRequest())
    return fetch(APIEndpoints.CARS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: body
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carCreateSuccess(json)))
    .catch(errors => dispatch(carCreateFailure(errors)))
  }
}

export function updateCar(body, id) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(carUpdateRequest())
    return fetch(APIEndpoints.CARS + '/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: body
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(carUpdateSuccess(json)))
    .catch(errors => dispatch(carUpdateFailure(errors)))
  }
}

export function initializeCar() {
  return {
    type: CAR_INITIALIZE
  }
}

export function carsRequest() {
  return {
    type: CARS_REQUEST
  }
}

export function carsSuccess(json) {
  return {
    type: CARS_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function carsFailure(errors) {
  return {
    type: CARS_FAILURE,
    errors: errors
  }
}

export function carRequest() {
  return {
    type: CAR_REQUEST
  }
}

export function carSuccess(json) {
  return {
    type: CAR_SUCCESS,
    item: json
  }
}

export function carFailure(errors) {
  return {
    type: CAR_FAILURE,
    errors: errors
  }
}

export function carsOptionsRequest() {
  return {
    type: CARS_OPTIONS_REQUEST
  }
}

export function carsOptionsSuccess(json) {
  return {
    type: CARS_OPTIONS_SUCCESS,
    item: json
  }
}

export function carsOptionsFailure(errors) {
  return {
    type: CARS_OPTIONS_FAILURE,
    errors: errors
  }
}

export function carCreateRequest() {
  return {
    type: CAR_CREATE_REQUEST
  }
}

export function carCreateSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: CAR_CREATE_SUCCESS,
      item: json
    })
    dispatch(push('/account/cars'))
  }
}

export function carCreateFailure(errors) {
  return {
    type: CAR_CREATE_FAILURE,
    errors: errors
  }
}

export function carUpdateRequest() {
  return {
    type: CAR_UPDATE_REQUEST
  }
}

export function carUpdateSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: CAR_UPDATE_SUCCESS,
      item: json
    })
    dispatch(push('/account/cars'))
  }
}

export function carUpdateFailure(errors) {
  return {
    type: CAR_UPDATE_FAILURE,
    errors: errors
  }
}
