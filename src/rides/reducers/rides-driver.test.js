import {
  RIDES_DRIVER_FETCH_REQUEST,
  RIDES_DRIVER_FETCH_SUCCESS,
} from '../action-types'
import { ridesDriver, initialState } from './rides-driver'
import { Ride, Pagination } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles RIDES_DRIVER_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {},
    }

    const state = ridesDriver({
      ...initialState
    }, {
      type: RIDES_DRIVER_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDES_DRIVER_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        items: [Ride()],
        meta: Pagination()
      }
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [Ride()],
      pagination: Pagination(),
    }

    const state = ridesDriver({
      ...initialState,
      isStarted: true,
      isFetching: true,
    }, {
      type: RIDES_DRIVER_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
