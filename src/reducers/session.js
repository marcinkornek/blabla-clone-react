import { LOGGED_IN } from '../actions/session';

const initialState = {
  loggedIn: false,
  user: {
    email: undefined,
    accessToken: undefined,
    permissions: []
  }
}

export default function sessions(state = initialState, action) {
  switch (action.type) {
  case LOGGED_IN:
    return [...state, {
      user: {
        email: action.text['email'],
        accessToken: action.text['accessToken'],
        permissions: []
      }
    }]

  default:
    return state;
  }
}
