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
import {
  fetchRides,
  fetchRidesAsDriver,
  fetchRidesAsPassenger,
  fetchRide,
  fetchRidesOptions,
  createRide,
  updateRide,
  loadSearchFormData,
} from './rides'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'
import { itReturnsValidType, itReturnsValidObject } from 'test/helpers/action-helpers'

describe('actions rides', () => {
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({ session: { email: email, access_token: access_token }})

  describe('fetchRides', () => {
    describe('with no params', () => {
      const asyncAction = fetchRides()
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.RIDES,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          start_city: undefined,
          destination_city: undefined,
          start_date: undefined,
          hide_full: undefined,
          page: 1,
          per: 10,
        }
      }

      itIsAsyncAction(action, [
        RIDES_FETCH_REQUEST,
        RIDES_FETCH_SUCCESS,
        RIDES_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchRides(page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.RIDES,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          start_city: undefined,
          destination_city: undefined,
          start_date: undefined,
          hide_full: undefined,
          page: 2,
          per: 20
        }
      }

      itIsAsyncAction(action, [
        RIDES_FETCH_REQUEST,
        RIDES_FETCH_SUCCESS,
        RIDES_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page, per and additional params', () => {
      const page = 2
      const per = 20
      const start_city = 'Opole'
      const destination_city = 'Wroclaw'
      const start_date = '2016-11-28T23:00:00.000Z'
      const hide_full= true
      const additonalParams = {
        start_city,
        destination_city,
        start_date,
        hide_full
      }
      const asyncAction = fetchRides(page, per, additonalParams)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.RIDES,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 2,
          per: 20,
          start_city,
          destination_city,
          start_date,
          hide_full
        }
      }

      itIsAsyncAction(action, [
        RIDES_FETCH_REQUEST,
        RIDES_FETCH_SUCCESS,
        RIDES_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('fetchRidesAsDriver', () => {
    const driverId = 1

    describe('with no params', () => {
      const asyncAction = fetchRidesAsDriver(driverId)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${driverId}/rides_as_driver`,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 1,
          per: 10,
        }
      }

      itIsAsyncAction(action, [
        RIDES_DRIVER_FETCH_REQUEST,
        RIDES_DRIVER_FETCH_SUCCESS,
        RIDES_DRIVER_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchRidesAsDriver(driverId, page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${driverId}/rides_as_driver`,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 2,
          per: 20
        }
      }

      itIsAsyncAction(action, [
        RIDES_DRIVER_FETCH_REQUEST,
        RIDES_DRIVER_FETCH_SUCCESS,
        RIDES_DRIVER_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('fetchRidesAsPassenger', () => {
    const passengerId = 1

    describe('with no params', () => {
      const asyncAction = fetchRidesAsPassenger(passengerId)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${passengerId}/rides_as_passenger`,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 1,
          per: 10,
        }
      }

      itIsAsyncAction(action, [
        RIDES_PASSENGER_FETCH_REQUEST,
        RIDES_PASSENGER_FETCH_SUCCESS,
        RIDES_PASSENGER_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchRidesAsPassenger(passengerId, page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${passengerId}/rides_as_passenger`,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 2,
          per: 20
        }
      }

      itIsAsyncAction(action, [
        RIDES_PASSENGER_FETCH_REQUEST,
        RIDES_PASSENGER_FETCH_SUCCESS,
        RIDES_PASSENGER_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('fetchRide', () => {
    const rideId = 1
    const asyncAction = fetchRide(rideId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.RIDES}/${rideId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      RIDE_FETCH_REQUEST,
      RIDE_FETCH_SUCCESS,
      RIDE_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('fetchRidesOptions', () => {
    const asyncAction = fetchRidesOptions()
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.RIDES}/options`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      RIDE_OPTIONS_FETCH_REQUEST,
      RIDE_OPTIONS_FETCH_SUCCESS,
      RIDE_OPTIONS_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('createRide', () => {
    const body = {
      data: 'data'
    }
    const asyncAction = createRide(body)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.RIDES,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body
    }

    itIsAsyncAction(action, [
      RIDE_CREATE_REQUEST,
      RIDE_CREATE_SUCCESS,
      RIDE_CREATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('updateRide', () => {
    const rideId = 1
    const body = {
      data: 'data'
    }
    const asyncAction = updateRide(body, rideId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'put',
      url: `${APIEndpoints.RIDES}/${rideId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body
    }

    itIsAsyncAction(action, [
      RIDE_UPDATE_REQUEST,
      RIDE_UPDATE_SUCCESS,
      RIDE_UPDATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('loadSearchFormData', () => {
    const data = {
      data: 'data'
    }
    const action = loadSearchFormData(data)

    itReturnsValidType(action, RIDES_SEARCH_FORM)
    itReturnsValidObject(action, 'data', data)
  })
})
