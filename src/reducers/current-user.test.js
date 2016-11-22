import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../constants/ActionTypes'
import { currentUser, initialState } from './current-user'
import { User, User2 } from '../../test/support/fixtures'

describe('reducers', () => {
  it('handles CURRENT_USER_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      errors: {},
    }

    const state = currentUser({
      ...initialState
    }, {
      type: CURRENT_USER_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CURRENT_USER_FETCH_SUCCESS', () => {
    const payload = {
      data: User(),
    }
    let user = User()
    user.date_of_birth = new Date(user.date_of_birth)
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: user,
      errors: {}
    }

    const state = currentUser({
      ...initialState,
      isStarted: true,
      isFetching: true,
    }, {
      type: CURRENT_USER_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CURRENT_USER_UPDATE_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: User(),
      errors: {},
    }

    const state = currentUser({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: User(),
      errors: {},
    }, {
      type: CURRENT_USER_UPDATE_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CURRENT_USER_UPDATE_SUCCESS', () => {
    let user = User()
    user.date_of_birth = new Date(user.date_of_birth)

    let user2 = User2()
    user2.date_of_birth = new Date(user2.date_of_birth)

    const payload = {
      data: User2(),
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: user2,
      errors: {}
    }

    const state = currentUser({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: user,
      errors: {}
    }, {
      type: CURRENT_USER_UPDATE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CURRENT_USER_UPDATE_FAILURE', () => {
    let user = User()
    user.date_of_birth = new Date(user.date_of_birth)

    const error = {
      response: {
        data: {
          first_name: ['is too short (minimum is 10 characters)'],
          last_name: ['is too short (minimum is 10 characters)']
        }
      }
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: user,
      errors: {
        first_name: ['is too short (minimum is 10 characters)'],
        last_name: ['is too short (minimum is 10 characters)']
      }
    }

    const state = currentUser({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: user,
      errors: {}
    }, {
      type: CURRENT_USER_UPDATE_FAILURE,
      error: error
    })

    expect(state).to.deep.equal(expected)
  })
})
