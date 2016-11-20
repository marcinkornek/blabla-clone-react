import {
  CARS_FETCH_REQUEST,
  CARS_FETCH_SUCCESS,
} from '../constants/ActionTypes'
import { cars, initialState } from './cars'
import { car, pagination } from '../../test/support/fixtures'

describe('reducers', () => {
  it('handles CARS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
      pagination: {}
    }

    const state = cars({
      ...initialState
    }, {
      type: CARS_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CARS_FETCH_SUCCESS', () => {
    const payload = {
      data: {
        items: [car],
        meta: pagination
      }
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      items: [car],
      pagination: pagination
    }

    const state = cars({
      ...initialState,
      isStarted: true,
      isFetching: true,
    }, {
      type: CARS_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
