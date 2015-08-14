WebAPIUtils = require('../utils/WebAPIUtils.coffee')

SessionActionCreators =
  receiveLogin: (loginJson) ->
    console.log loginJson
    loginJson

  loginFB: (response) ->
    dispatcher = @
    WebAPIUtils.loginFB(response).then((json) ->
      dispatcher.actions.receiveLogin(json)
    )

  login: (email, password) ->
    dispatcher = @
    WebAPIUtils.login(email, password).then((json) ->
      dispatcher.actions.receiveLogin(json)
    )

# module.exports = alt.createActions(SessionActionCreators)
