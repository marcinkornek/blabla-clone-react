import {
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
  CAR_INITIALIZE,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
} from '../action-types'
import { car, initialState } from './car'
import { Car, Car2 } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles CAR_INITIALIZE', () => {
    const expected = {
      ...initialState,
    }

    const state = car({
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Car(),
    }, {
      type: CAR_INITIALIZE
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CAR_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
    }

    const state = car({
      ...initialState
    }, {
      type: CAR_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CAR_FETCH_SUCCESS', () => {
    const payload = {
      data: Car()
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Car(),
    }

    const state = car({
      ...initialState,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
    }, {
      type: CAR_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CAR_UPDATE_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: Car(),
    }

    const state = car({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Car(),
    }, {
      type: CAR_UPDATE_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles CAR_UPDATE_SUCCESS', () => {
    const payload = {
      data: Car2()
    }
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Car2(),
    }

    const state = car({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: Car(),
    }, {
      type: CAR_UPDATE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
