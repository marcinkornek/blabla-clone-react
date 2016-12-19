import axios from 'axios'
import {
  RIDE_REQUEST_CREATE_REQUEST,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CREATE_FAILURE,
  RIDE_REQUEST_CHANGE_REQUEST,
  RIDE_REQUEST_CHANGE_SUCCESS,
  RIDE_REQUEST_CHANGE_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'

export function createRideRequest(rideId, places) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_REQUEST_CREATE_REQUEST, RIDE_REQUEST_CREATE_SUCCESS, RIDE_REQUEST_CREATE_FAILURE],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.RIDE_REQUESTS,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          data: {
            ride_id: rideId,
            places
          },
          simple: false
        }
      }
    })
  }
}

export function changeRideRequest(rideRequestId, status) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [RIDE_REQUEST_CHANGE_REQUEST, RIDE_REQUEST_CHANGE_SUCCESS, RIDE_REQUEST_CHANGE_FAILURE],
      payload: {
        request: {
          method: 'put',
          url: `${APIEndpoints.RIDE_REQUESTS}/${rideRequestId}`,
          headers: {
            'X-User-Email': session.email,
            'X-User-Token': session.access_token
          },
          data: {
            status
          },
          simple: false
        }
      }
    })
  }
}
