import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class UsersNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    return (
      <form className='login-email-form' onSubmit={this.handleSubmitRegisterForm.bind(this)}>
        <Bootstrap.Input type='text' label='First name' placeholder='First name' ref='first_name' />
        <Bootstrap.Input type='text' label='Last name' placeholder='Last name' ref='last_name' />
        <Bootstrap.Input type='text' label='Email' placeholder='Email' ref='email' />
        <Bootstrap.Input type='password' label='Password' placeholder='Password' ref='password' />
        <Bootstrap.Input type='password' label='Password confirmation' placeholder='Password confirmation' ref='passwordConfirmation' />
        <Bootstrap.ButtonInput type='submit' value='Login' />
      </form>
    )
  }

  handleSubmitRegisterForm(e) {
    e.preventDefault()
    const first_name = this.refs.first_name.getValue()
    const last_name  = this.refs.email.getValue()
    const email     = this.refs.email.getValue()
    const password  = this.refs.password.getValue()
    const passwordConfirmation = this.refs.passwordConfirmation.getValue()
    var newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }
    this.props.onAddClick(newUser);
  }
}

UsersNewPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
