import {
  RIDES_PASSENGER_FETCH_REQUEST,
  RIDES_PASSENGER_FETCH_SUCCESS,
} from '../action-types'
import { ridesPassenger, initialState } from './rides-passenger'
import { Ride, Pagination } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles RIDES_PASSENGER_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {},
    }

    const state = ridesPassenger({
      ...initialState
    }, {
      type: RIDES_PASSENGER_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDES_PASSENGER_FETCH_SUCCESS', () => {
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

    const state = ridesPassenger({
      ...initialState,
      isStarted: true,
      isFetching: true,
    }, {
      type: RIDES_PASSENGER_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
