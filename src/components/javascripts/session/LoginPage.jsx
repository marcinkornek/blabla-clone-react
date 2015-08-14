import React                 from 'react'
import Bootstrap             from 'react-bootstrap'
import SessionActionCreators from '../../../actions/SessionActionCreators.coffee'
import styles                from '../../stylesheets/session/LoginPage.scss'

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var data = {}

var LoginPage = React.createClass({
  getInitialState: function() {
    return {
      showLoginForm: false,
      errors: []
    };
  },

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

  showFormOnClick: function() {
    if (this.state.showLoginForm === false) {
      return this.setState({
        showLoginForm: true
      });
    } else {
      return this.setState({
        showLoginForm: false
      });
    }
  },

  _onSubmit: function(e) {
    var email, password;
    e.preventDefault();
    email    = this.refs.email.getValue();
    password = this.refs.password.getValue();
    return SessionActionCreators.login(email, password);
  },

  render: function() {
    var errors, LoginForm
    if (this.state.errors.length > 0) {
      errors =
        <ErrorNotice errors={this.state.errors}/>
    }

    if (this.state.showLoginForm) {
      LoginForm =
        <form className='login-email-form' onSubmit={this._onSubmit}>
          <Bootstrap.Input type='text' label='Email' placeholder='Email' ref='email' onChange={this.handleChange} />
          <Bootstrap.Input type='password' label='Password' placeholder='Password' ref='password' onChange={this.handleChange} />
          <Bootstrap.ButtonInput type='submit' value='Login' />
        </form>
    }

    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            <button className='login-facebook-button btn btn-primary' onClick={this.loginWithFacebook}>Login with facebook</button>
            <button className='login-email-button btn btn-default' onClick={this.showFormOnClick}>Login with email and password</button>
            {LoginForm}
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
});


module.exports = LoginPage
