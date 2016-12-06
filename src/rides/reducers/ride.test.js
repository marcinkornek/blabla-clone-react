import {
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CHANGE_SUCCESS,
} from '../action-types'
import { ride, initialState } from './ride'
import { Ride, Ride2 } from 'test/support/fixtures'

describe('reducers', () => {
  it('handles RIDE_FETCH_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
    }

    const state = ride({
      ...initialState
    }, {
      type: RIDE_FETCH_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_FETCH_SUCCESS', () => {
    let item = {
      ...Ride(),
      start_date: new Date(Ride().start_date)
    }
    const payload = {
      data: Ride()
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: item,
    }

    const state = ride({
      ...initialState,
      isStarted: true,
      isFetching: true,
      isSaving: false,
      item: undefined,
    }, {
      type: RIDE_FETCH_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_UPDATE_REQUEST', () => {
    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: Ride(),
    }

    const state = ride({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Ride(),
    }, {
      type: RIDE_UPDATE_REQUEST
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_UPDATE_SUCCESS', () => {
    let item = {
      ...Ride2(),
      start_date: new Date(Ride2().start_date)
    }
    const payload = {
      data: Ride2()
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: item,
    }

    const state = ride({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: true,
      item: Ride(),
    }, {
      type: RIDE_UPDATE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_UPDATE_SUCCESS', () => {
    let item = {
      ...Ride2(),
      start_date: new Date(Ride2().start_date)
    }
    const payload = {
      data: Ride2()
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: item,
    }

    const state = ride({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Ride(),
    }, {
      type: RIDE_UPDATE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })

  it('handles RIDE_REQUEST_CHANGE_SUCCESS', () => {
    let item = {
      ...Ride2(),
      start_date: new Date(Ride2().start_date)
    }
    const payload = {
      data: Ride2()
    }

    const expected = {
      ...state,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: item,
    }

    const state = ride({
      ...initialState,
      isStarted: true,
      isFetching: false,
      isSaving: false,
      item: Ride(),
    }, {
      type: RIDE_REQUEST_CHANGE_SUCCESS,
      payload: payload
    })

    expect(state).to.deep.equal(expected)
  })
})
