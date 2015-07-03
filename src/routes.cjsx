Route = require('react-router').Route

MainApp = require('./components/MainApp.cjsx')
LoginPage = require('./components/session/LoginPage.cjsx')

routes =
  <Route name='app' path='/' handler={MainApp} >
    <Route name='login' path='login' handler={LoginPage}/>
  </Route>

module.exports = routes
