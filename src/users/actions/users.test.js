import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  CURRENT_USER_CREATE_REQUEST,
  CURRENT_USER_CREATE_SUCCESS,
  CURRENT_USER_CREATE_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'
import {
  fetchUsers,
  fetchUser,
  fetchCurrentUser,
  createUser,
  updateCurrentUser,
  checkUserEmailUniqueness
} from './users'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'
import { User } from 'test/support/fixtures'

describe('actions users', () => {
  const id = 1
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({ session: { id: id, email: email, access_token: access_token }})

  describe('fetchUsers', () => {
    describe('with no params', () => {
      const asyncAction = fetchUsers()
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.USERS,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page: 1,
          per: 10
        }
      }

      itIsAsyncAction(action, [
        USERS_FETCH_REQUEST,
        USERS_FETCH_SUCCESS,
        USERS_FETCH_FAILURE,
      ])

      itCallsApi(action, opts)
    })

    describe('with page and per params', () => {
      const page = 2
      const per = 20
      const asyncAction = fetchUsers(page, per)
      const action = asyncAction(dispatch, getState)
      const opts = {
        url: APIEndpoints.USERS,
        headers: {
          'X-User-Email': email,
          'X-User-Token': access_token
        },
        params: {
          page,
          per
        }
      }

      itIsAsyncAction(action, [
        USERS_FETCH_REQUEST,
        USERS_FETCH_SUCCESS,
        USERS_FETCH_FAILURE
      ])

      itCallsApi(action, opts)
    })
  })

  describe('fetchUser', () => {
    const userId = 1
    const asyncAction = fetchUser(userId)
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.USERS}/${userId}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      USER_FETCH_REQUEST,
      USER_FETCH_SUCCESS,
      USER_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('fetchCurrentUser', () => {
    const asyncAction = fetchCurrentUser()
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.USERS}/${id}/profile`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      CURRENT_USER_FETCH_REQUEST,
      CURRENT_USER_FETCH_SUCCESS,
      CURRENT_USER_FETCH_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('createUser', () => {
    const body = {
      data: 'data'
    }
    const asyncAction = createUser(body)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.USERS,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body,
      simple: false
    }

    itIsAsyncAction(action, [
      CURRENT_USER_CREATE_REQUEST,
      CURRENT_USER_CREATE_SUCCESS,
      CURRENT_USER_CREATE_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('updateCurrentUser', () => {
    const body = {
      data: 'data'
    }
    const asyncAction = updateCurrentUser(body)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'put',
      url: `${APIEndpoints.USERS}/${id}`,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      },
      data: body,
      simple: false
    }

    itIsAsyncAction(action, [
      CURRENT_USER_UPDATE_REQUEST,
      CURRENT_USER_UPDATE_SUCCESS,
      CURRENT_USER_UPDATE_FAILURE
    ])

    itCallsApi(action, opts)
  })
})
