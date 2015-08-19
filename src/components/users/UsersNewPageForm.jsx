import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/Login'

export default class LoginEmailPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showLoginForm: true,
      errors: []
    }
  }

  render() {
    return (
      <form className='login-email-form' onSubmit={this.handleSubmitRegisterForm.bind(this)}>
        <Bootstrap.Input type='text' label='First name' placeholder='First name' ref='firstName' />
        <Bootstrap.Input type='text' label='Last name' placeholder='Last name' ref='lastName' />
        <Bootstrap.Input type='text' label='Email' placeholder='Email' ref='email' />
        <Bootstrap.Input type='password' label='Password' placeholder='Password' ref='password' />
        <Bootstrap.Input type='password' label='Password confirmation' placeholder='Password confirmation' ref='passwordConfirmation' />
        <Bootstrap.ButtonInput type='submit' value='Login' />
      </form>
    )
  }

  handleSubmitRegisterForm(e) {
    e.preventDefault()
    const firstName = this.refs.firstName.getValue()
    const lastName  = this.refs.email.getValue()
    const email     = this.refs.email.getValue()
    const password  = this.refs.password.getValue()
    const passwordConfirmation = this.refs.passwordConfirmation.getValue()
    var newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }
    this.props.onAddClick(newUser);
  }
}

LoginEmailPage.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
