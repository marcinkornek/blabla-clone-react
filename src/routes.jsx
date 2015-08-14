import React from "react";
import { Route } from "react-router";

import MainApp   from './components/javascripts/MainApp.jsx'
import LoginPage from './components/javascripts/session/LoginPage.jsx'

var routes =
  <Route name='app' path='/' handler={MainApp} >
    <Route name='login' path='/login' handler={LoginPage}/>
  </Route>

module.exports = routes
