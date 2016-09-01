import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function createRideRequest(rideId, places) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideRequestCreateRequest());
    return fetch(cons.APIEndpoints.RIDE_REQUESTS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.user.email,
        'X-User-Token': session.user.access_token
      },
      body: JSON.stringify({
        'ride_id': rideId,
        'places':  places,
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideRequestCreateSuccess(json)))
    .catch(errors => dispatch(rideRequestCreateFailure(errors)))
  };
}

export function changeRideRequest(rideRequestId, status) {
  return (dispatch, getState) => {
    const { session } = getState()
    dispatch(rideRequestChangeRequest());
    return fetch(cons.APIEndpoints.RIDE_REQUESTS + '/' + rideRequestId, {
      method: 'put',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session.user.email,
        'X-User-Token': session.user.access_token
      },
      body: JSON.stringify({
        'status': status
      })
    })
    .then(status)
    .then(req => req.json())
    .then(json => dispatch(rideRequestChangeSuccess(json)))
    .catch(errors => dispatch(rideRequestChangeFailure(errors)))
  };
}

export function rideRequestCreateRequest() {
  return {
    type: types.RIDE_REQUEST_CREATE_REQUEST,
  };
}

export function rideRequestCreateSuccess(ride) {
  return {
    type: types.RIDE_REQUEST_CREATE_SUCCESS,
    places: ride.free_places_count,
    ride: ride
  }
}

export function rideRequestCreateFailure(errors) {
  return {
    type: types.RIDE_REQUEST_CREATE_FAILURE,
    errors: errors
  }
}

export function rideRequestChangeRequest() {
  return {
    type: types.RIDE_REQUEST_CHANGE_REQUEST,
  };
}

export function rideRequestChangeSuccess(ride) {
  return {
    type: types.RIDE_REQUEST_CHANGE_SUCCESS,
    ride: ride
  }
}

export function rideRequestChangeFailure(errors) {
  return {
    type: types.RIDE_REQUEST_CHANGE_FAILURE,
    errors: errors
  }
}
