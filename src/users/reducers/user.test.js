import {
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
} from '../action-types'
import { user, initialState } from './user'
import { User } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles USER_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
      errors: [],
    }

    const state = user({
      ...initialState
    }, {
      type: USER_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles USER_FETCH_SUCCESS', () => {
    let item = User()
    item.start_date = new Date(item.start_date)

    const payload = {
      data: User()
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: item,
    }

    const state = user({
      ...initialState,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
    }, {
      type: USER_FETCH_SUCCESS,
      payload: payload
    })
  })
})
