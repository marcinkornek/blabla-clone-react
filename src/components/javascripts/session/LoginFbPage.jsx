import React                 from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/LoginPage'

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments) } }
var data = {}

export default class LoginFbPage extends React.Component {
  componentDidMount() {
    window.fbAsyncInit = (__bind(function() {
      FB.init({
        appId: '116661262005772',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
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
    FB.api("/me", {
      fields: "last_name, first_name, email, id"
    }, function(response) {
      console.log(response)
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
      <button className='login-facebook-button btn btn-primary' onClick={this.loginWithFacebook.bind(this)}>Login with facebook</button>
    )
  }
}
