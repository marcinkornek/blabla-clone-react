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
  RIDE_SEARCH_UPDATE,
  RIDE_FILTER_UPDATE,
} from '../constants/ActionTypes'
import { APIEndpoints } from '../constants/constants'

export function fetchRides(page = 1, per = 10, options = {}) {
  return (dispatch, getState) => {
    const { ridesFilters } = getState()
    const filters = ridesFilters.filters
    const search = ridesFilters.search

    return dispatch({
      types: [
        RIDES_FETCH_REQUEST,
        RIDES_FETCH_SUCCESS,
        RIDES_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: APIEndpoints.RIDES,
          params: {
            page,
            per,
            filters,
            search,
          }
        }
      }
    })
  }
}

export function fetchRidesAsDriver(user_id, page = 1, per = 10) {
  return {
    types: [
      RIDES_DRIVER_FETCH_REQUEST,
      RIDES_DRIVER_FETCH_SUCCESS,
      RIDES_DRIVER_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/as_driver`,
        params: {
          page,
          per,
          user_id,
        }
      }
    }
  }
}

export function fetchRidesAsPassenger(user_id, page = 1, per = 10) {
  return {
    types: [
      RIDES_PASSENGER_FETCH_REQUEST,
      RIDES_PASSENGER_FETCH_SUCCESS,
      RIDES_PASSENGER_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/as_passenger`,
        params: {
          page,
          per,
          user_id,
        }
      }
    }
  }
}

export function fetchRide(rideId) {
  return {
    types: [
      RIDE_FETCH_REQUEST,
      RIDE_FETCH_SUCCESS,
      RIDE_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/${rideId}`,
      }
    }
  }
}

export function fetchRidesOptions() {
  return {
    types: [
      RIDE_OPTIONS_FETCH_REQUEST,
      RIDE_OPTIONS_FETCH_SUCCESS,
      RIDE_OPTIONS_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/options`,
      }
    }
  }
}

export function createRide(body) {
  return {
    types: [
      RIDE_CREATE_REQUEST,
      RIDE_CREATE_SUCCESS,
      RIDE_CREATE_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.RIDES,
        data: body
      }
    }
  }
}

export function updateRide(body, rideId) {
  return {
    types: [
      RIDE_UPDATE_REQUEST,
      RIDE_UPDATE_SUCCESS,
      RIDE_UPDATE_FAILURE
    ],
    payload: {
      request: {
        method: 'put',
        url: `${APIEndpoints.RIDES}/${rideId}`,
        data: body
      }
    }
  }
}

export function loadSearchFormData(data) {
  return {
    type: RIDES_SEARCH_FORM,
    data: data
  }
}

export function updateRidesSearch(search = {}) {
  return {
    type: RIDE_SEARCH_UPDATE,
    search: search
  }
}

export function updateRidesFilters(filters = {}) {
  return {
    type: RIDE_FILTER_UPDATE,
    filters: filters
  }
}
