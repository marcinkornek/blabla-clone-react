import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  USER_UPDATE_SUCCESS,
} from '../constants/ActionTypes'
import { session, initialState } from './session'
import { User, CurrentUser2 } from '../../test/support/fixtures'

describe('reducers', () => {
  it('handles LOGIN_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      errors: [],
      isAuthenticated: false,
      id: undefined,
      access_token: undefined,
      email: undefined,
      role: undefined
    }

    const state = session({
      ...initialState
    }, {
      type: LOGIN_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles LOGIN_SUCCESS', () => {
    const payload = {
      data: {
        id: 1,
        role: 'user',
        access_token: 'access_token',
        email: 'harry.potter@a.com',
      }
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      errors: [],
      isAuthenticated: true,
      id: 1,
      role: 'user',
      access_token: 'access_token',
      email: 'harry.potter@a.com',
    }

    const state = session({
      ...initialState,
      isStarted: true,
      isFetching: true,
      errors: [],
      isAuthenticated: false,
      id: undefined,
      access_token: undefined,
      email: undefined,
      role: undefined
    }, {
      type: LOGIN_SUCCESS,
      payload: payload
    })
  })

   it('handles LOGIN_FAILURE', () => {
    const error = {
      response : {
        data: {
          error: 'Invalid Email and/or Password.'
        }
      }
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      errors: [],
      isAuthenticated: false,
      id: 1,
      role: 'user',
      access_token: 'access_token',
      email: 'harry.potter@a.com',
    }

    const state = session({
      ...initialState,
      errors: ['Invalid Email and/or Password.'],
    }, {
      type: LOGIN_FAILURE,
      error: error
    })
  })

  it('handles USER_UPDATE_SUCCESS', () => {
    const payload = {
      data: CurrentUser2(),
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      errors: [],
      isAuthenticated: true,
      id: 1,
      role: 'user',
      access_token: 'access_token',
      email: CurrentUser2().email,
    }

    const state = session({
      ...initialState,
      isStarted: true,
      isFetching: false,
      errors: [],
      isAuthenticated: false,
      id: 1,
      role: 'user',
      access_token: 'access_token',
      email: 'harry.potter@a.com'
    }, {
      type: USER_UPDATE_SUCCESS,
      payload: payload
    })
  })

})
