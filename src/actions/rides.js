import axios from 'axios'
import {
  RIDES_SEARCH_FORM,
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_FETCH_FAILURE,
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_FETCH_FAILURE,
  RIDE_CREATE_REQUEST,
  RIDE_CREATE_SUCCESS,
  RIDE_CREATE_FAILURE,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_UPDATE_FAILURE,
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
  RIDE_OPTIONS_FETCH_FAILURE,
  RIDES_DRIVER_FETCH_REQUEST,
  RIDES_DRIVER_FETCH_SUCCESS,
  RIDES_DRIVER_FETCH_FAILURE,
  RIDES_PASSENGER_FETCH_REQUEST,
  RIDES_PASSENGER_FETCH_SUCCESS,
  RIDES_PASSENGER_FETCH_FAILURE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

export function fetchRides(page = 1, per = 10, options = {}) {
  return (dispatch, getState) => {
    const { session } = getState()
    var rideOptions = ''
    if (options) {
      if (options.start_city) { rideOptions = '&start_city=' + options.start_city }
      if (options.destination_city) { rideOptions += '&destination_city=' + options.destination_city }
      if (options.start_date) { rideOptions += '&start_date=' + options.start_date }
      if (options.hide_full) { rideOptions += '&hide_full=' + options.hide_full }
    }
    return dispatch({
      types: [RIDES_FETCH_REQUEST, RIDES_FETCH_SUCCESS, RIDES_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.RIDES + '?page=' + page + '&per=' + per + rideOptions,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function fetchRidesAsDriver(driverId, page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDES_DRIVER_FETCH_REQUEST, RIDES_DRIVER_FETCH_SUCCESS, RIDES_DRIVER_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.USERS + '/' + driverId + '/rides_as_driver?page=' + page + '&per=' + per,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function fetchRidesAsPassenger(passengerId, page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDES_PASSENGER_FETCH_REQUEST, RIDES_PASSENGER_FETCH_SUCCESS, RIDES_PASSENGER_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.USERS + '/' + passengerId + '/rides_as_passenger?page=' + page + '&per=' + per,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function fetchRide(rideId) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_FETCH_REQUEST, RIDE_FETCH_SUCCESS, RIDE_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.RIDES + '/' + rideId,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function fetchRidesOptions() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_OPTIONS_FETCH_REQUEST, RIDE_OPTIONS_FETCH_SUCCESS, RIDE_OPTIONS_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.RIDES + '/options',
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          }
        }
      }
    })
  }
}

export function createRide(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_CREATE_REQUEST, RIDE_CREATE_SUCCESS, RIDE_CREATE_FAILURE],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.RIDES,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          data: body
        }
      }
    })
  }
}

export function updateRide(body, ride_id) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_UPDATE_REQUEST, RIDE_UPDATE_SUCCESS, RIDE_UPDATE_FAILURE],
      payload: {
        request: {
          method: 'put',
          url: APIEndpoints.RIDES + '/' + ride_id,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          data: body
        }
      }
    })
  }
}

// export function ridesSuccess(json, options) {
//   return (dispatch, getState) => {
//     var query = '?page=' + json.meta.current_page
//     if (options) {
//       if (options.start_city) { query += '&start_city=' + options.start_city }
//       if (options.destination_city) { query += '&destination_city=' + options.destination_city }
//       if (options.start_date) { query += '&start_date=' + options.start_date }
//       if (options.hide_full) { query += '&hide_full=' + options.hide_full }
//     }
//     dispatch({
//       type: RIDES_FETCH_SUCCESS,
//       items: json.items,
//       pagination: json.meta,
//       filters: json.filters
//     })
//     dispatch(push('/rides' + query))
//   }
// }

export function loadSearchFormData(data) {
  return {
    type: RIDES_SEARCH_FORM,
    data: data
  }
}
