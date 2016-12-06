import {
  CAR_INITIALIZE,
  CARS_FETCH_REQUEST,
  CARS_FETCH_SUCCESS,
  CARS_FETCH_FAILURE,
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
  CAR_FETCH_FAILURE,
  CAR_OPTIONS_FETCH_REQUEST,
  CAR_OPTIONS_FETCH_SUCCESS,
  CAR_OPTIONS_FETCH_FAILURE,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAILURE,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'
import {
  fetchCars,
  fetchCar,
  fetchCarsOptions,
  createCar,
  updateCar,
  initializeCar,
} from './cars'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'
import { itReturnsValidType, itReturnsValidObject } from 'test/helpers/action-helpers'

describe('actions cars', () => {
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({ session: { email: email, access_token: access_token }})

  describe('fetchCars', () => {
    const userId = 1

    describe('with no params', () => {
      const asyncAction = fetchCars(userId)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${userId}/cars`,
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
        CARS_FETCH_REQUEST,
        CARS_FETCH_SUCCESS,
        CARS_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchCars(userId, page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: `${APIEndpoints.USERS}/${userId}/cars`,
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
        CARS_FETCH_REQUEST,
        CARS_FETCH_SUCCESS,
        CARS_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('fetchCar', () => {
    const carId = 1
    const asyncAction = fetchCar(carId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.CARS}/${carId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      CAR_FETCH_REQUEST,
      CAR_FETCH_SUCCESS,
      CAR_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('fetchCarsOptions', () => {
    const asyncAction = fetchCarsOptions()
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.CARS}/options`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      CAR_OPTIONS_FETCH_REQUEST,
      CAR_OPTIONS_FETCH_SUCCESS,
      CAR_OPTIONS_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('createCar', () => {
    const body = {
      data: 'data'
    }
    const asyncAction = createCar(body)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.CARS,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body,
      simple: false
    }

    itIsAsyncAction(action, [
      CAR_CREATE_REQUEST,
      CAR_CREATE_SUCCESS,
      CAR_CREATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('updateCar', () => {
    const carId = 1
    const body = {
      data: 'data'
    }
    const asyncAction = updateCar(body, carId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'put',
      url: `${APIEndpoints.CARS}/${carId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body,
      simple: false
    }

    itIsAsyncAction(action, [
      CAR_UPDATE_REQUEST,
      CAR_UPDATE_SUCCESS,
      CAR_UPDATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('initializeCar', () => {
    const action = initializeCar()

    itReturnsValidType(action, CAR_INITIALIZE)
  })
})
