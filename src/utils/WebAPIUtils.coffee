request = require('superagent')
$       = require('jquery')

APIEndpoints = 'http://localhost:3000'

_getErrors = (res) ->
  errorMsgs = [ 'Something went wrong, please try again' ]
  if json = JSON.parse(res.text)
    if json['errors']
      errorMsgs = json['errors']
    else errorMsgs = [ json['error'] ]  if json['error']
  errorMsgs

WebAPIUtils =
  loginFB: (response) ->
    promise = $.Deferred()
    request.post(APIEndpoints + '/api/sessions/oath_login')
      .send(
        uid: response['id']
        provider: 'facebook'
        email: response['email']
        first_name: response['first_name']
        last_name: response['last_name']
      )
      .set('Accept', 'application/vnd.blabla-clone-v1+json')
      .end (error, res) ->
        if res
          if res.error
            errorMsgs = _getErrors(res)
            promise.reject(errorMsgs)
          else
            json = JSON.parse(res.text)
            promise.resolve(json)
    promise

  login: (email, password) ->
    promise = $.Deferred()
    request.post(APIEndpoints + '/api/sessions/login')
      .send(
        email: email
        password: password
      )
      .set('Accept', 'application/vnd.blabla-clone-v1+json')
      .end (error, res) ->
        if res
          if res.error
            errorMsgs = _getErrors(res)
            promise.reject(errorMsgs)
          else
            json = JSON.parse(res.text)
            promise.resolve(json)
            # ServerActionCreators.receiveLogin(json, errorMsgs)
    promise

module.exports = WebAPIUtils
