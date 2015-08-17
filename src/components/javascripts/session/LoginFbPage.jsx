import React                 from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/LoginPage'

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var data = {}

var LoginFbPage = React.createClass({
  componentDidMount: function() {
    window.fbAsyncInit = (__bind(function() {
      FB.init({
        appId: '116661262005772',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
      });
      return FB.Event.subscribe('auth.statusChange', this.statusChangeCallback);
    }, this));

    return (function(d) {
      var id, js, ref;
      id = "facebook-jssdk";
      ref = d.getElementsByTagName("script")[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement("script");
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      return ref.parentNode.insertBefore(js, ref);
    })(document);
  },

  getDataFromFb: function() {
    return FB.api("/me", {
      fields: "last_name, first_name, email, id"
    }, function(response) {
      return SessionActionCreators.loginFB(response);
    });
  },

  statusChangeCallback: function(response) {
    if (response.status === 'connected' && data.login === true) {
      return this.getDataFromFb();
    }
  },

  checkLoginState: function() {
    return FB.getLoginStatus(__bind(function(response) {
      return this.statusChangeCallback(response);
    }, this));
  },

  loginWithFacebook: function() {
    data.login = true;
    return FB.login(this.checkLoginState(), {
      scope: 'email'
    });
  },

  render: function() {
    return (
      <button className='login-facebook-button btn btn-primary' onClick={this.loginWithFacebook}>Login with facebook</button>
    )
  }
});

module.exports = LoginFbPage
