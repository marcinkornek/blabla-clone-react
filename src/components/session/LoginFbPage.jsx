import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/Login'

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments) } }
var data = {}

export default class LoginFbPage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.statusChangeCallback = this.statusChangeCallback.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
  }

  componentDidMount() {
    var appId, version
    if (__DEVELOPMENT__) {
      appId = '116661262005772'
      version = 'v2.3'
    } else {
      appId = '423991604472385'
      version = 'v2.4'
    }

    window.fbAsyncInit = (__bind(function() {
      FB.init({
        appId: appId,
        status: true,
        cookie: true,
        xfbml: true,
        version: version
      })
      FB.Event.subscribe('auth.statusChange', this.statusChangeCallback)
    }, this));

    (function(d) {
      var id, js, ref
      id = "facebook-jssdk"
      ref = d.getElementsByTagName("script")[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement("script")
      js.id = id
      js.async = true
      js.src = "//connect.facebook.net/en_US/sdk.js"
      ref.parentNode.insertBefore(js, ref)
    })(document)
  }

  getDataFromFb() {
    var that = this
    FB.api("/me", {
      fields: "last_name, first_name, email, id"
    }, function(response) {
      that.props.onDataReceive(response);
    })
  }

  statusChangeCallback(response) {
    if (response.status === 'connected' && data.login === true) {
      this.getDataFromFb()
    }
  }

  checkLoginState() {
    FB.getLoginStatus(__bind(function(response) {
      this.statusChangeCallback(response)
    }, this))
  }

  loginWithFacebook() {
    data.login = true
    FB.login(this.checkLoginState(), {
      scope: 'email'
    })
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary login-button' onClick={this.loginWithFacebook}>Login with facebook</button>
      </div>
    )
  }
}

LoginFbPage.propTypes = {
  onDataReceive: PropTypes.func.isRequired
};
