React = require('react')
Router = require('react-router')

MainApp = React.createClass
  render: ->
    <div>
      <Router.RouteHandler />
    </div>

module.exports = MainApp
