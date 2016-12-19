import {
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
} from '../action-types'
import { rideOptions, initialState } from './ride-options'

describe('reducers', () => {
  it('handles RIDE_OPTIONS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      currencies: [],
      cars: [],
    }

    const state = rideOptions({
      ...initialState
    }, {
      type: RIDE_OPTIONS_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_OPTIONS_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        currencies: ['pln', 'usd', 'eur'],
        cars: [{ id: 1, name: 'Ford Focus' }],
      }
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      currencies: ['pln', 'usd', 'eur'],
      cars: [{ id: 1, name: 'Ford Focus' }],
    }

    const state = rideOptions({
      ...initialState,
      isStarted: true,
      isFetching: true
    }, {
      type: RIDE_OPTIONS_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
