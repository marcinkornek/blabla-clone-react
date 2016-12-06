import {
  RIDES_SEARCH_FORM
} from '../action-types'
import { ridesSearch, initialState } from './rides-search'

describe('reducers', () => {
  it('handles RIDES_SEARCH_FORM', () => {
    const data = { hide_full: false }
    const expected = {
      ...state,
      data: data
    }

    const state = ridesSearch({
      ...initialState
    }, {
      type: RIDES_SEARCH_FORM,
      data: data
    })

    expect(state).to.deep.equal(expected)
  })
})
