import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
} from '../action-types'
import { rides, initialState } from './rides'
import { Ride, Pagination } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles RIDES_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {},
      filters: {},
    }

    const state = rides({
      ...initialState
    }, {
      type: RIDES_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDES_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        filters: { full_rides: 1 },
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
      filters: { full_rides: 1 },
    }

    const state = rides({
      ...initialState,
      isStarted: true,
      isFetching: true,
    }, {
      type: RIDES_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
