import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function createRideRequest(rideId, places, session) {
  return dispatch => {
    dispatch(rideRequestCreateRequest());
    return fetch(cons.APIEndpoints.RIDE_REQUESTS, {
      method: 'post',
      headers: {
        'Accept': 'application/vnd.blabla-clone-v1+json',
        'Content-Type': 'application/json',
        'X-User-Email': session['email'],
        'X-User-Token': session['access_token']
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

export function rideRequestCreateRequest() {
  return {
    type: types.RIDE_REQUEST_CREATE_REQUEST,
  };
}

export function rideRequestCreateSuccess(json) {
  return {
    type: types.RIDE_REQUEST_CREATE_SUCCESS,
    places: json.ride.free_places_count
  }
}

export function rideRequestCreateFailure(errors) {
  return {
    type: types.RIDE_REQUEST_CREATE_FAILURE,
    errors: errors
  }
}
