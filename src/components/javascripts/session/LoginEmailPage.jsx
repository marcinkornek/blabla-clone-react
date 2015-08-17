import React                 from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/LoginPage'

var LoginEmailPage = React.createClass({
  getInitialState: function() {
    return {
      showLoginForm: false,
      errors: []
    };
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
    console.log(email, password);
    // return SessionActionCreators.login(email, password);
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
        <button className='login-email-button btn btn-default' onClick={this.showFormOnClick}>Login with email and password</button>
        {LoginForm}
      </div>
    )
  }
});

module.exports = LoginEmailPage
