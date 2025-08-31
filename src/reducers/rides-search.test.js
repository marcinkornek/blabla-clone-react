import {
  RIDES_SEARCH_FORM
} from '../constants/ActionTypes'
import { ridesSearch, initialState } from './rides-search'

describe('reducers', () => {
  it('handles RIDES_SEARCH_FORM', () => {
    const data = { hide_full: false }
    const state = ridesSearch({
      ...initialState
    }, {
      type: RIDES_SEARCH_FORM,
      data: data
    })
    const expected = {
      ...initialState,
      data: data
    }

    expect(state).to.deep.equal(expected)
  })
})
