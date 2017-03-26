// utils
import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Col, Alert } from "react-bootstrap"
import { Link } from "react-router"
import { browserHistory } from 'react-router'
import ActionCable from 'actioncable'
import _ from 'lodash'

// actions
import { logInEmailBackend, logInFbBackend, saveToLocalStorage } from "../../../actions/session"
import { APIEndpoints, ActionCableURL } from '../../../constants/constants'
import { fetchCurrentUser } from '../../../actions/users'
import { fetchNotifications } from '../../../actions/notifications'

// components
import { LoginFb } from "../../../components/session/login-fb/login-fb"
import LoginEmail from "../../../components/session/login-email/login-email"

class Login extends Component {
  static propTypes = {
    errors: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  handleEmailLogin(data) {
    const { logInEmailBackend, fetchCurrentUser, fetchNotifications, saveToLocalStorage } = this.props

    logInEmailBackend(data)
      .then((response) => {
        let data = response.payload.data
        fetchCurrentUser()
        fetchNotifications()
        window.cable = ActionCable.createConsumer(`${ActionCableURL}?email=${data.email}&token=${data.access_token}`)
        saveToLocalStorage(data.email, data.access_token)
        browserHistory.push('/')
      })
      .catch((errors) => {})
  }

  handleFbLogin(data) {
    const { logInFbBackend, fetchCurrentUser, fetchNotifications, saveToLocalStorage } = this.props

    logInFbBackend(data)
      .then((response) => {
        let data = response.payload.data
        fetchCurrentUser()
        fetchNotifications()
        window.cable = ActionCable.createConsumer(`${ActionCableURL}?email=${data.email}&token=${data.access_token}`)
        saveToLocalStorage(data.email, data.access_token)
        browserHistory.push('/')
      })
      .catch((errors) => {})
  }

  renderFormErrors() {
    const { errors } = this.props

    if (!_.isEmpty(errors)) {
      return(
        <Alert bsStyle="danger">
          <strong>{errors}</strong>
        </Alert>
      )
    }
  }

  render() {
    const { logInFbBackend, errors } = this.props

    return (
      <div className="show-grid">
        <div className="background clearfix"></div>

        <div className="login-errors">
          <Col xs={12} md={8} mdOffset={2}>
            {this.renderFormErrors()}
          </Col>
        </div>

        <div className="login clearfix">
          <Col xs={12} md={8} mdOffset={2} className="display-table">
            <div className="login-form">
              <h3 className="login-form__title">Login</h3>
              <LoginFb
                onDataReceive={this.handleFbLogin.bind(this)}
              />
              <div className="login-button__separator">or</div>
              <LoginEmail
                errors={errors}
                onSubmit={this.handleEmailLogin.bind(this)}
              />
            </div>
            <div className="register-form">
              <h3 className="login-form__title">Register</h3>
              <button className="btn btn-primary register-button"><Link key="register" to="/register">Register</Link></button>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.session.errors,
    isFetching: state.session.isFetching,
    isAuthenticated: state.session.isAuthenticated,
  }
}

const mapDispatchToProps = {
  logInEmailBackend,
  logInFbBackend,
  fetchCurrentUser,
  fetchNotifications,
  saveToLocalStorage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
