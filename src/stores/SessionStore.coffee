SessionActionCreators = require('../actions/SessionActionCreators.coffee')

# _accessToken = []
# _email = []

class SessionStore
  constructor: ->
    @bindActions(SessionActionCreators)
    @state = {
      accessToken: []
      email: []
    }

  # isLoggedIn: ->
  #   console.log '@state', @state
  #   if @state.accessToken then true else false

  # onUpdateAccessToken: (accessToken) ->
  #   @setState({accessToken: accessToken})

  # onUpdateEmail: (email) ->
  #   @setState({email: email})

  onReceiveLogin: (data) ->
    console.log 'onReceiveLogin'
    @setState({
      accessToken: data['access_token']
      email: data['email']
    })

  # getAccessToken: ->
  #   _accessToken

  # getEmail: ->
  #   _email

  # onReceiveLogin: (data) ->
  #   _accessToken = data['access_token']
  #   _email = data['email']

# module.exports = alt.createStore(SessionStore, 'SessionStore')
