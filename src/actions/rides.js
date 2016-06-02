import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchRides(router, session, page = 1, per = 10, options = {}) {
  return dispatch => {
    dispatch(ridesRequest());
    var rideOptions = ''
    if (options) {
      if (options.start_city) { rideOptions = '&start_city=' + options.start_city }
      if (options.destination_city) { rideOptions += '&destination_city=' + options.destination_city }
      if (options.start_date) { rideOptions += '&start_date=' + options.start_date }
    }
    return fetch(cons.APIEndpoints.RIDES + '?page=' + page + '&per=' + per + rideOptions, {
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
    .then(json => dispatch(ridesSuccess(router, json, options)))
    .catch(errors => dispatch(ridesFailure(errors)))
  };
}

export function fetchRidesAsDriver(driverId, page = 1, per = 10) {
  return dispatch => {
    dispatch(ridesAsDriverRequest());
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
  };
}

export function fetchRidesAsPassenger(passengerId, session, page = 1, per = 10) {
  return dispatch => {
    dispatch(ridesAsPassengerRequest());
    return fetch(cons.APIEndpoints.USERS + '/' + passengerId + '/rides_as_passenger?page=' + page + '&per=' + per, {
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
    .then(json => dispatch(ridesAsPassengerSuccess(json)))
    .catch(errors => dispatch(ridesAsPassengerFailure(errors)))
  };
}

export function fetchRide(rideId, session) {
  return dispatch => {
    dispatch(rideRequest());
    return fetch(cons.APIEndpoints.RIDES + '/' + rideId, {
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
    .then(json => dispatch(rideSuccess(json)))
    .catch(errors => dispatch(rideFailure(errors)))
  };
}

export function fetchRidesOptions(session) {
  return dispatch => {
    dispatch(ridesOptionsRequest());
    return fetch(cons.APIEndpoints.RIDES + '/options', {
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
    .then(json => dispatch(ridesOptionsSuccess(json)))
    .catch(errors => dispatch(ridesOptionsFailure(errors)))
  };
}

export function createRide(router, body, session) {
  return dispatch => {
    dispatch(rideCreateRequest());
    return fetch(cons.APIEndpoints.RIDES, {
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
    .then(json => dispatch(rideCreateSuccessWithRedirect(router, json)))
    .catch(errors => dispatch(rideCreateFailure(errors)))
  };
}

export function updateRide(router, body, session, ride_id) {
  return dispatch => {
    console.log('body', body);
    console.log('session', session);
    console.log('ride_id', ride_id);
    dispatch(rideUpdateRequest());
    return fetch(cons.APIEndpoints.RIDES + '/' + ride_id, {
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
    .then(json => dispatch(rideUpdateSuccessWithRedirect(router, json)))
    .catch(errors => dispatch(rideUpdateFailure(errors)))
  };
}

export function ridesRequest() {
  return {
    type: types.RIDES_REQUEST,
  };
}

export function ridesSuccess(router, json, options) {
  return (dispatch, getState) => {
    var query = '?page=' + json.meta.current_page
    if (options) {
      if (options.start_city) { query += '&start_city=' + options.start_city }
      if (options.destination_city) { query += '&destination_city=' + options.destination_city }
      if (options.start_date) { query += '&start_date=' + options.start_date }
    }
    router.replace('/rides' + query)
    dispatch({
      type: types.RIDES_SUCCESS,
      rides: json.rides,
      pagination: json.meta,
      filters: json.filters
    });
  };
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
    type: types.RIDE_REQUEST,
  };
}

export function rideSuccess(json) {
  return {
    type: types.RIDE_SUCCESS,
    ride: json
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
    type: types.RIDE_CREATE_REQUEST,
  };
}

export function rideCreateSuccessWithRedirect(router, json) {
  return (dispatch, getState) => {
    dispatch(rideCreateSuccess(json));
    router.replace('/account/rides_as_driver')
  };
}

export function rideCreateSuccess(json) {
  return {
    type: types.RIDE_CREATE_SUCCESS,
    ride: json
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
    type: types.RIDE_UPDATE_REQUEST,
  };
}

export function rideUpdateSuccessWithRedirect(router, json) {
  return (dispatch, getState) => {
    dispatch(rideUpdateSuccess(json));
    router.replace('/account/rides_as_driver')
  };
}

export function rideUpdateSuccess(json) {
  return {
    type: types.RIDE_UPDATE_SUCCESS,
    ride: json
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
    type: types.RIDE_OPTIONS_REQUEST,
  };
}

export function ridesOptionsSuccess(json) {
  return {
    type: types.RIDE_OPTIONS_SUCCESS,
    ridesOptions: json
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
    type: types.RIDES_DRIVER_REQUEST,
  };
}

export function ridesAsDriverSuccess(json) {
  return {
    type: types.RIDES_DRIVER_SUCCESS,
    rides: json.rides,
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
    type: types.RIDES_PASSENGER_REQUEST,
  };
}

export function ridesAsPassengerSuccess(json) {
  return {
    type: types.RIDES_PASSENGER_SUCCESS,
    rides: json.rides,
    pagination: json.meta
  }
}

export function ridesAsPassengerFailure(errors) {
  return {
    type: types.RIDES_PASSENGER_FAILURE,
    errors: errors
  }
}
