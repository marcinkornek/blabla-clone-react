import 'whatwg-fetch'
import * as types from '../constants/ActionTypes'
import * as cons  from '../constants/constants'

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers());
    return fetch(cons.APIEndpoints.USERS, {
    	method: 'get',
    	headers: {
    		'Accept': 'application/vnd.blabla-clone-v1+json',
    		'Content-Type': 'application/json'
    	}
    })
      .then(req => req.json())
      .then(json => dispatch(receiveUsers(json)));
  };
}

export function requestUsers() {
	console.log('bb');
  return {
    type: types.REQUEST_USERS,
  };
}

export function receiveUsers(reddit, json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
