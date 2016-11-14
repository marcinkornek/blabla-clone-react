import 'whatwg-fetch'
import {
  RIDE_REQUEST_CREATE_REQUEST,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CREATE_FAILURE,
  RIDE_REQUEST_CHANGE_REQUEST,
  RIDE_REQUEST_CHANGE_SUCCESS,
  RIDE_REQUEST_CHANGE_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function createRideRequest(rideId, places) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideRequestCreateRequest())
    return fetch(APIEndpoints.RIDE_REQUESTS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: JSON.stringify({
        'ride_id': rideId,
        'places':  places
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideRequestCreateSuccess(json)))
    .catch(errors => dispatch(rideRequestCreateFailure(errors)))
  }
}

export function changeRideRequest(rideRequestId, status) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideRequestChangeRequest())
    return fetch(APIEndpoints.RIDE_REQUESTS + '/' + rideRequestId, {
      method: 'put',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.email,
        'X-User-Token': session.access_token
      },
      body: JSON.stringify({
        'status': status
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideRequestChangeSuccess(json)))
    .catch(errors => dispatch(rideRequestChangeFailure(errors)))
  }
}

export function rideRequestCreateRequest() {
  return {
    type: RIDE_REQUEST_CREATE_REQUEST
  }
}

export function rideRequestCreateSuccess(json) {
  return {
    type: RIDE_REQUEST_CREATE_SUCCESS,
    places: json.free_places_count,
    item: json
  }
}

export function rideRequestCreateFailure(errors) {
  return {
    type: RIDE_REQUEST_CREATE_FAILURE,
    errors: errors
  }
}

export function rideRequestChangeRequest() {
  return {
    type: RIDE_REQUEST_CHANGE_REQUEST
  }
}

export function rideRequestChangeSuccess(json) {
  return {
    type: RIDE_REQUEST_CHANGE_SUCCESS,
    item: json
  }
}

export function rideRequestChangeFailure(errors) {
  return {
    type: RIDE_REQUEST_CHANGE_FAILURE,
    errors: errors
  }
}
