import {
  RIDE_REQUEST_CREATE_REQUEST,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CREATE_FAILURE,
  RIDE_REQUEST_CHANGE_REQUEST,
  RIDE_REQUEST_CHANGE_SUCCESS,
  RIDE_REQUEST_CHANGE_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'
import {
  createRideRequest,
  changeRideRequest,
} from './ride-requests'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'

describe('actions ride-requests', () => {
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({ session: { email: email, access_token: access_token }})

  describe('createRideRequest', () => {
    const rideId = 1
    const places = 4
    const asyncAction = createRideRequest(rideId, places)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.RIDE_REQUESTS,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: {
        ride_id: rideId,
        places
      },
      simple: false
    }

    itIsAsyncAction(action, [
      RIDE_REQUEST_CREATE_REQUEST,
      RIDE_REQUEST_CREATE_SUCCESS,
      RIDE_REQUEST_CREATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('changeRideRequest', () => {
    const rideRequestId = 1
    const status = 'accepted'
    const asyncAction = changeRideRequest(rideRequestId, status)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'put',
      url: `${APIEndpoints.RIDE_REQUESTS}/${rideRequestId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: {
        status
      },
      simple: false
    }

    itIsAsyncAction(action, [
      RIDE_REQUEST_CHANGE_REQUEST,
      RIDE_REQUEST_CHANGE_SUCCESS,
      RIDE_REQUEST_CHANGE_FAILURE
    ])

    itCallsApi(action, opts)
  })
})
