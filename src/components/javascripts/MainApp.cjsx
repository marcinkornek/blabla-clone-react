React = require('react')
Router = require('react-router')
styles = require('../stylesheets/MainApp.scss')
Header = require('./Header.cjsx')
SessionStore = require('../../stores/SessionStore.coffee')

@connectToStores
getStateFromStores = ->
  console.log 'getstate', SessionStore.getState()
  SessionStore.getState()
  # isLoggedIn: SessionStore.isLoggedIn
  # email:      SessionStore.getEmail

# @connectToStores
MainApp = React.createClass
#   @getStores: ->
#     console.log 'aaaaaaa'
#     [SessionStore]

#   @getPropsFromStores: ->
#     console.log 'aaaaaaa'
#     SessionStore.getState()

  # componentDidMount: ->
  #   SessionStore.addChangeListener @_onChange

  # componentWillUnmount: ->
  #   SessionStore.removeChangeListener @_onChange

  # _onChange: ->
  #   @setState getStateFromStores()

  render: ->
    # console.log @props
    <div>
      <Header />
      <Router.RouteHandler />
    </div>

module.exports = MainApp
