// utils
import React, { Component, PropTypes } from 'react'
import { autobind } from 'core-decorators'
import { reduxForm, Field } from 'redux-form'

// components
import { renderTextField } from '../../../components/shared/render-text-field/render-text-field'

// form validators
import LoginValidator from '../login-validator/login-validator'

export class LoginEmail extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    showLoginForm: false,
  }

  renderLoginForm() {
    const { handleSubmit } = this.props

    if (this.state.showLoginForm) {
      return(
        <form onSubmit={handleSubmit} className='login-email-form'>
          <Field name="email" type="text" component={renderTextField} label="Email"/>
          <Field name="password" type="password" component={renderTextField} label="Password"/>
          <button type="submit" className="btn btn-default form-submit">Submit</button>
        </form>
      )
    }
  }

  @autobind
  showFormOnClick() {
    const { showLoginForm } = this.state
    if (showLoginForm === false) {
      this.setState({showLoginForm: true})
    } else {
      this.setState({showLoginForm: false})
    }
  }

  render() {
    return (
      <div>
        <button className='btn btn-default login-button' onClick={this.showFormOnClick}>
          Login with email and password
        </button>
        {this.renderLoginForm()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'LoginEmail',
  validate: LoginValidator
})(LoginEmail)
