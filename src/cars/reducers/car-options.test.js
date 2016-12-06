import {
  CAR_OPTIONS_FETCH_REQUEST,
  CAR_OPTIONS_FETCH_SUCCESS,
} from '../action-types'
import { carOptions, initialState } from './car-options'
import { CarOptions } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles CAR_OPTIONS_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      colors: [],
      comforts: [],
      categories: []
    }

    const state = carOptions({
      ...initialState
    }, {
      type: CAR_OPTIONS_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CAR_OPTIONS_FETCH_SUCCESS', () => {
    const payload = {
      data: CarOptions()
    }
    const expected = {
      ...state,
      ...CarOptions(),
      isStarted: true,
      isFetching: false,
    }

    const state = carOptions({
      ...initialState,
      isStarted: true,
      isFetching: true
    }, {
      type: CAR_OPTIONS_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
