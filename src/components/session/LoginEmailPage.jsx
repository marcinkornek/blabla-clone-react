import React, { PropTypes }   from 'react'
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import styles                 from '../../stylesheets/session/Login'

export default class LoginEmailPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showLoginForm: false,
    }
  }

  render() {
    if (this.state.showLoginForm) {
      var LoginForm =
        <form className='login-email-form' onSubmit={this.handleSubmitLoginForm.bind(this)}>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Email</ControlLabel>
            <FormControl type='text' label='Email' placeholder='Email' ref='email' />
          </FormGroup>
          <FormGroup controlId="formControlsPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl type='password' label='Password' placeholder='Password' ref='password' />
          </FormGroup>

          <Button type='submit'>Login</Button>
        </form>
    }

    return (
      <div>
        <button className='btn btn-default login-button' onClick={this.showFormOnClick.bind(this)}>Login with email and password</button>
        {LoginForm}
      </div>
    )
  }

  showFormOnClick() {
    const { showLoginForm } = this.state
    if (showLoginForm === false) {
      this.setState({showLoginForm: true})
    } else {
      this.setState({showLoginForm: false})
    }
  }

  handleSubmitLoginForm(e) {
    e.preventDefault()
    const email    = this.refs.email.getValue()
    const password = this.refs.password.getValue()

    this.props.onAddClick({email: email, password: password});
  }
}

LoginEmailPage.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
