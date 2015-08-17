import * as types from '../constants/ActionTypes';

export function addSession(text) {
  return { type: types.ADD_SESSION, text };
}

// import * as types  from '../constants/ActionTypes';
// import WebAPIUtils from '../utils/WebAPIUtils'

// export function addTodo(text) {
//   return { type: types.ADD_TODO, text };
// }

// export function deleteTodo(id) {
//   return { type: types.DELETE_TODO, id };
// }

// export function editTodo(id, text) {
//   return { type: types.EDIT_TODO, id, text };
// }

// export function completeTodo(id) {
//   return { type: types.COMPLETE_TODO, id };
// }

// export function completeAll() {
//   return { type: types.COMPLETE_ALL };
// }

// export function clearCompleted() {
//   return { type: types.CLEAR_COMPLETED };
// // }

// export function loginFB(response) {
//   return {
//     type: types.LOGIN_FB_REQUEST,
//     promise: WebAPIUtils.loginFB(response)
//   }
// }

// export function receiveLogin (loginResponse) {
//   type: RECEIVE_LOGIN,
//   response: loginResponse,
//   receivedAt: Date.now()
// }

 // WebAPIUtils = require('../utils/WebAPIUtils.coffee')

 // SessionActionCreators =
 //   receiveLogin: (loginJson) ->
 //     console.log loginJson
 //     loginJson

 //   loginFB: (response) ->
 //     dispatcher = @
 //     WebAPIUtils.loginFB(response).then((json) ->
 //       dispatcher.actions.receiveLogin(json)
 //     )

 //   login: (email, password) ->
 //     dispatcher = @
 //     WebAPIUtils.login(email, password).then((json) ->
 //       dispatcher.actions.receiveLogin(json)
 //     )

 //  module.exports = alt.createActions(SessionActionCreators)
