import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from '../shared/RenderTextField'
import LoginValidator from './LoginValidator'

class LoginEmailPage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showLoginForm: false,
    }
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props

    if (this.state.showLoginForm) {
      var LoginForm =
        <form onSubmit={handleSubmit} className='login-email-form'>
          <Field name="email" type="text" component={renderTextField} label="Email"/>
          <Field name="password" type="password" component={renderTextField} label="Password"/>
          <button type="submit" className="btn btn-default form-submit">Submit</button>
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
}

export default reduxForm({
  form: 'LoginEmailPage',
  validate: LoginValidator
})(LoginEmailPage)
