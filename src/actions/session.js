import * as types from '../constants/ActionTypes'

export function logIn(text) {
  return { type: types.LOGGED_IN, text };
}
