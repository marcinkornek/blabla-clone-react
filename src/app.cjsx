React  = require('react')
Router = require('react-router')
window.React = React
routes = require('./routes.cjsx')

Router.run(routes, (Root) ->
  React.render(<Root/>, document.getElementById('root'))
)
