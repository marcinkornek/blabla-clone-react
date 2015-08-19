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
    if (this.state.showLoginForm) {
      var LoginForm =
        <form className='login-email-form' onSubmit={this.handleSubmitLoginForm.bind(this)}>
          <Bootstrap.Input type='text' label='Email' placeholder='Email' ref='email' />
          <Bootstrap.Input type='password' label='Password' placeholder='Password' ref='password' />
          <Bootstrap.ButtonInput type='submit' value='Login' />
        </form>
    }

    return (
      <div>
        <button className='login-email-button btn btn-default' onClick={this.showFormOnClick.bind(this)}>Login with email and password</button>
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
