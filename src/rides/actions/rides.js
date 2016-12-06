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
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'

export function fetchRides(page = 1, per = 10, { start_city, destination_city, start_date, hide_full } = {}) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDES_FETCH_REQUEST, RIDES_FETCH_SUCCESS, RIDES_FETCH_FAILURE],
      payload: {
        request: {
          url: APIEndpoints.RIDES,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          params: {
            start_city,
            destination_city,
            start_date,
            hide_full,
            page,
            per,
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
          url: `${APIEndpoints.USERS}/${driverId}/rides_as_driver`,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          params: {
            page,
            per,
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
          url: `${APIEndpoints.USERS}/${passengerId}/rides_as_passenger`,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          params: {
            page,
            per,
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
          url: `${APIEndpoints.RIDES}/${rideId}`,
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
          url: `${APIEndpoints.RIDES}/options`,
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

export function updateRide(body, rideId) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_UPDATE_REQUEST, RIDE_UPDATE_SUCCESS, RIDE_UPDATE_FAILURE],
      payload: {
        request: {
          method: 'put',
          url: `${APIEndpoints.RIDES}/${rideId}`,
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

export function loadSearchFormData(data) {
  return {
    type: RIDES_SEARCH_FORM,
    data: data
  }
}
