import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../action-types'
import { currentUser, initialState } from './current-user'
import { CurrentUser, CurrentUser2 } from 'test/support/fixtures'

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
      data: CurrentUser(),
    }
    let user = {
      ...CurrentUser(),
      date_of_birth: new Date(CurrentUser().date_of_birth)
    }
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
      item: CurrentUser(),
      errors: {},
    }

    const state = currentUser({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: CurrentUser(),
      errors: {},
    }, {
      type: CURRENT_USER_UPDATE_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CURRENT_USER_UPDATE_SUCCESS', () => {
    let user = {
      ...CurrentUser(),
      date_of_birth: new Date(CurrentUser().date_of_birth)
    }
    let user2 = {
      ...CurrentUser2(),
      date_of_birth: new Date(CurrentUser2().date_of_birth)
    }
    const payload = {
      data: CurrentUser2(),
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
    let user = {
      ...CurrentUser(),
      date_of_birth: new Date(CurrentUser().date_of_birth)
    }
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
