import * as types   from '../constants/ActionTypes'
import APIEndpoints from '../constants/constants'

function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers());
    return fetch(`${APIEndpoints.users}`)
      .then(req => req.json())
      .then(json => dispatch(receiveUsers(json)));
  };
}

function requestUsers() {
  return {
    type: types.REQUEST_USERS,
  };
}

function receiveUsers(reddit, json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
