import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/session/LoginPage'
import * as storage          from '../../../store/storage'
import * as actions          from '../../../actions/session'

export default class LoginEmailPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      showLoginForm: false,
      errors: []
    }
  }

  static propTypes = {
    location: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.any,
    router: PropTypes.any
  }

  showFormOnClick() {
    const { showLoginForm } = this.state
    if (showLoginForm === false) {
      this.setState({showLoginForm: true})
    } else {
      this.setState({showLoginForm: false})
    }
  }

  handleSubmit(e) {
    var email, password
    e.preventDefault()
    email    = this.refs.email.getValue()
    password = this.refs.password.getValue()

    const { store, router } = this.context
    const { location } = this.props

    setImmediate(() => {
      store.dispatch(actions.logIn({email, password}))
      storage.put('token', Math.random().toString(36).substring(7))
    })
  }

  render() {
    var errors, LoginForm
    if (this.state.errors.length > 0) {
      errors =
        <ErrorNotice errors={this.state.errors}/>
    }

    if (this.state.showLoginForm) {
      LoginForm =
        <form className='login-email-form' onSubmit={this.handleSubmit.bind(this)}>
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
}
