import React, { PropTypes }   from 'react'
import { reduxForm }          from 'redux-form'
import classNames             from 'classnames'
import LoginValidator         from './LoginValidator'
import styles                 from '../../stylesheets/session/Login'
import formsStyles            from '../../stylesheets/shared/Forms'

export default class LoginEmailPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showLoginForm: false,
    }
  }

  render() {
    const {fields: {email, password}, handleSubmit, submitting} = this.props;

    if (this.state.showLoginForm) {
      var LoginForm =
        <form onSubmit={handleSubmit} className='login-email-form'>
          <div className={classNames('form-group', {'has-error': email.touched && email.error})}>
            <label className="control-label">Email</label>
            <input type="text" placeholder="Email" className="form-control" {...email}/>
            {email.touched && email.error && <div className="form-error">{email.error}</div>}
          </div>

          <div className={classNames('form-group', {'has-error': password.touched && password.error})}>
            <label className="control-label">Password</label>
            <input type="password" placeholder="Password" className="form-control" {...password}/>
            {password.touched && password.error && <div className="form-error">{password.error}</div>}
          </div>

          <div>
            <button type="submit" className="btn btn-default" disabled={submitting}>
              {submitting ? <i/> : <i/>} Submit
            </button>
          </div>
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

LoginEmailPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

LoginEmailPage = reduxForm({
  form: 'LoginEmailPage',
  fields: ['email', 'password'],
  validate: LoginValidator
})(LoginEmailPage);

export default LoginEmailPage;
