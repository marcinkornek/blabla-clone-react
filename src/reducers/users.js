import { REQUEST_USERS, RECEIVE_USERS } from '../actions/users';

const initialState = {
  users: {
    isFetching: false,
    items: []
  }
}

export default function users(state = initialState, action) {
  switch (action.type) {
  case REQUEST_USERS:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_USERS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.users,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}
