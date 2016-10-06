import React, { Component, PropTypes } from "react"
import { Col, Alert } from "react-bootstrap"
import { connect } from "react-redux"
import Router, { Link } from "react-router"
import LoginFb from "../../../components/session/login-fb/login-fb"
import LoginEmail from "../../../components/session/login-email/login-email"
import * as actions from "../../../actions/session"

class Login extends Component {
  static propTypes = {
    errors: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleSubmit(data) {
    const { logInEmailBackend } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      body.append(key, data[key])
    })
    logInEmailBackend(this.context.router, body)
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
                onDataReceive={text =>
                  logInFbBackend(this.context.router, text)
                }
              />
              <div className="login-button__separator">or</div>
              <LoginEmail
                errors={errors}
                onSubmit={this.handleSubmit.bind(this)}
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
    isLoggedIn: state.session.isLoggedIn,
    user: state.session
  }
}

const mapDispatchToProps = {
  logInEmailBackend: actions.logInEmailBackend,
  logInFbBackend: actions.logInFbBackend
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
