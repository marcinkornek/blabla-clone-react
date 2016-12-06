import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../action-types'
import { APIEndpoints } from '../../constants/constants'
import {
  loginFromCookie,
  logInEmailBackend,
  logInFbBackend,
  logout,
  saveToLocalStorage,
} from './session'
import { itCallsApi, itIsAsyncAction } from 'test/helpers/redux-axios-middleware-helpers'
import { itReturnsValidType, itReturnsValidObject } from 'test/helpers/action-helpers'
import { User } from 'test/support/fixtures'

describe('actions session', () => {
  const email = 'harry.potter@a.com'
  const access_token = 'access_token'
  const dispatch = (x) => x
  const getState = () => ({})

  describe('loginFromCookie', () => {
    const data = {
      email,
      access_token
    }
    const asyncAction = loginFromCookie(data)
    const action = asyncAction(dispatch, getState)
    const opts = {
      url: `${APIEndpoints.SESSIONS}/get_user`,
      headers: {
        'X-User-Email': data.email,
        'X-User-Token': data.access_token
      }
    }

    itIsAsyncAction(action, [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('logInEmailBackend', () => {
    const password = 'password'
    const data = {
      email,
      password
    }
    const asyncAction = logInEmailBackend(data)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.LOGIN_EMAIL,
      data: data
    }

    itIsAsyncAction(action, [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('logInFbBackend', () => {
    const uid = 'uid'
    const provider = 'provider'
    const first_name = 'first_name'
    const last_name = 'last_name'
    const data = {
      id: uid,
      email,
      first_name,
      last_name,
    }
    const asyncAction = logInFbBackend(data)
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'post',
      url: APIEndpoints.LOGIN_FB,
      data: {
        uid: uid,
        provider: 'facebook',
        email: email,
        first_name: first_name,
        last_name: last_name
      }
    }

    itIsAsyncAction(action, [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('logout', () => {
    const asyncAction = logout()
    const getState = () => ({ session: { email: email, access_token: access_token }})
    const action = asyncAction(dispatch, getState)
    const opts = {
      method: 'delete',
      url: APIEndpoints.SESSIONS,
      headers: {
        'X-User-Email': email,
        'X-User-Token': access_token
      }
    }

    itIsAsyncAction(action, [
      LOGOUT_REQUEST,
      LOGOUT_SUCCESS,
      LOGOUT_FAILURE
    ])

    itCallsApi(action, opts)
  })

  describe('saveToLocalStorage', () => {
    // uses mock-local-storage
    afterEach(() => {
      localStorage.clear();
      localStorage.itemInsertionCallback = null;
    })

    const asyncAction = saveToLocalStorage(email, access_token)
    const action = asyncAction(dispatch, getState)

    it('saves email and access_token to localStorage', () => {
      expect(localStorage.getItem('email')).to.eql(email)
      expect(localStorage.getItem('access_token')).to.eql(access_token)
    })
  })
})
