import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'
import { push } from 'react-router-redux'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchRides(page = 1, per = 10, options = {}) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(ridesRequest())
    var rideOptions = ''
    if (options) {
      if (options.start_city) { rideOptions = '&start_city=' + options.start_city }
      if (options.destination_city) { rideOptions += '&destination_city=' + options.destination_city }
      if (options.start_date) { rideOptions += '&start_date=' + options.start_date }
      if (options.hide_full) { rideOptions += '&hide_full=' + options.hide_full }
    }
    return fetch(cons.APIEndpoints.RIDES + '?page=' + page + '&per=' + per + rideOptions, {
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
    .then(json => dispatch(ridesSuccess(json, options)))
    .catch(errors => dispatch(ridesFailure(errors)))
  }
}

export function fetchRidesAsDriver(driverId, page = 1, per = 10) {
  return dispatch => {
    dispatch(ridesAsDriverRequest())
    return fetch(cons.APIEndpoints.USERS + '/' + driverId + '/rides_as_driver?page=' + page + '&per=' + per, {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(ridesAsDriverSuccess(json)))
    .catch(errors => dispatch(ridesAsDriverFailure(errors)))
  }
}

export function fetchRidesAsPassenger(passengerId, page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(ridesAsPassengerRequest())
    return fetch(cons.APIEndpoints.USERS + '/' + passengerId + '/rides_as_passenger?page=' + page + '&per=' + per, {
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
    .then(json => dispatch(ridesAsPassengerSuccess(json)))
    .catch(errors => dispatch(ridesAsPassengerFailure(errors)))
  }
}

export function fetchRide(rideId) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideRequest())
    return fetch(cons.APIEndpoints.RIDES + '/' + rideId, {
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
    .then(json => dispatch(rideSuccess(json)))
    .catch(errors => dispatch(rideFailure(errors)))
  }
}

export function fetchRidesOptions() {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(ridesOptionsRequest())
    return fetch(cons.APIEndpoints.RIDES + '/options', {
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
    .then(json => dispatch(ridesOptionsSuccess(json)))
    .catch(errors => dispatch(ridesOptionsFailure(errors)))
  }
}

export function createRide(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideCreateRequest())
    return fetch(cons.APIEndpoints.RIDES, {
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
    .then(json => dispatch(rideCreateSuccess(json)))
    .catch(errors => dispatch(rideCreateFailure(errors)))
  }
}

export function updateRide(body, ride_id) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideUpdateRequest())
    return fetch(cons.APIEndpoints.RIDES + '/' + ride_id, {
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
    .then(json => dispatch(rideUpdateSuccess(json)))
    .catch(errors => dispatch(rideUpdateFailure(errors)))
  }
}

export function ridesRequest() {
  return {
    type: types.RIDES_REQUEST
  }
}

export function ridesSuccess(json, options) {
  return (dispatch, getState) => {
    var query = '?page=' + json.meta.current_page
    if (options) {
      if (options.start_city) { query += '&start_city=' + options.start_city }
      if (options.destination_city) { query += '&destination_city=' + options.destination_city }
      if (options.start_date) { query += '&start_date=' + options.start_date }
      if (options.hide_full) { query += '&hide_full=' + options.hide_full }
    }
    dispatch({
      type: types.RIDES_SUCCESS,
      items: json.items,
      pagination: json.meta,
      filters: json.filters
    })
    dispatch(push('/rides' + query))
  }
}

export function loadSearchFormData(data) {
  return {
    type: types.RIDES_SEARCH_FORM,
    data: data
  }
}

export function ridesFailure(errors) {
  return {
    type: types.RIDES_FAILURE,
    errors: errors
  }
}

export function rideRequest() {
  return {
    type: types.RIDE_REQUEST
  }
}

export function rideSuccess(json) {
  return {
    type: types.RIDE_SUCCESS,
    item: json
  }
}

export function rideFailure(errors) {
  return {
    type: types.RIDE_FAILURE,
    errors: errors
  }
}

export function rideCreateRequest() {
  return {
    type: types.RIDE_CREATE_REQUEST
  }
}

export function rideCreateSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.RIDE_CREATE_SUCCESS,
      item: json
    })
    dispatch(push('/account/rides_as_driver'))
  }
}

export function rideCreateFailure(errors) {
  return {
    type: types.RIDE_CREATE_FAILURE,
    errors: errors
  }
}

export function rideUpdateRequest() {
  return {
    type: types.RIDE_UPDATE_REQUEST
  }
}

export function rideUpdateSuccess(json) {
  return (dispatch, getState) => {
    dispatch({
      type: types.RIDE_UPDATE_SUCCESS,
      item: json
    })
    dispatch(push('/account/rides_as_driver'))
  }
}

export function rideUpdateFailure(errors) {
  return {
    type: types.RIDE_UPDATE_FAILURE,
    errors: errors
  }
}

export function ridesOptionsRequest() {
  return {
    type: types.RIDE_OPTIONS_REQUEST
  }
}

export function ridesOptionsSuccess(json) {
  return {
    type: types.RIDE_OPTIONS_SUCCESS,
    item: json
  }
}

export function ridesOptionsFailure(errors) {
  return {
    type: types.RIDE_OPTIONS_FAILURE,
    errors: errors
  }
}

export function ridesAsDriverRequest() {
  return {
    type: types.RIDES_DRIVER_REQUEST
  }
}

export function ridesAsDriverSuccess(json) {
  return {
    type: types.RIDES_DRIVER_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function ridesAsDriverFailure(errors) {
  return {
    type: types.RIDES_DRIVER_FAILURE,
    errors: errors
  }
}

export function ridesAsPassengerRequest() {
  return {
    type: types.RIDES_PASSENGER_REQUEST
  }
}

export function ridesAsPassengerSuccess(json) {
  return {
    type: types.RIDES_PASSENGER_SUCCESS,
    items: json.items,
    pagination: json.meta
  }
}

export function ridesAsPassengerFailure(errors) {
  return {
    type: types.RIDES_PASSENGER_FAILURE,
    errors: errors
  }
}
