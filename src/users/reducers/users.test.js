import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
} from '../action-types'
import { users, initialState } from './users'
import { User, Pagination } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles USERS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {}
    }

    const state = users({
      ...initialState
    }, {
      type: USERS_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles USERS_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        items: [User()],
        meta: Pagination()
      }
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [User()],
      pagination: Pagination()
    }

    const state = users({
      ...initialState,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {}
    }, {
      type: USERS_FETCH_SUCCESS,
      payload: payload
    })
  })
})
