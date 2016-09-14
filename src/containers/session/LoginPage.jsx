import React, { Component, PropTypes } from "react";
import { Col, Alert } from "react-bootstrap"
import { connect } from "react-redux";
import Router, { Link } from "react-router"
import LoginFbPage from "../../components/session/LoginFbPage"
import LoginEmailPage from "../../components/session/LoginEmailPage"
import * as actions from "../../actions/session";

class LoginPage extends Component {
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
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      body.append(key, data[key])
    });

    logInEmailBackend(this.context.router, body)
  }

  render() {
    const { logInFbBackend, errors } = this.props;

    var formErrors
    if (!_.isEmpty(errors)) {
      formErrors =
        <Alert bsStyle="danger">
          <strong>{errors}</strong>
        </Alert>
    }

    return (
      <div className="show-grid">
        <div className="background clearfix"></div>

        <div className="login-errors">
          <Col xs={12} md={8} mdOffset={2}>
            {formErrors}
          </Col>
        </div>

        <div className="login clearfix">
          <Col xs={12} md={8} mdOffset={2} className="display-table">
            <div className="login-form">
              <h3 className="login-form__title">Login</h3>
              <LoginFbPage
                onDataReceive={text =>
                  logInFbBackend(this.context.router, text)
                } />
              <div className="login-button__separator">or</div>
              <LoginEmailPage
                errors={errors}
                onSubmit={this.handleSubmit.bind(this)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
