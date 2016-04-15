import React, { PropTypes }  from "react";
import { Col, Alert }        from "react-bootstrap"
import { connect }           from "react-redux";
import Router, { Link }      from "react-router"

import LoginFbPage           from "../../components/session/LoginFbPage"
import LoginEmailPage        from "../../components/session/LoginEmailPage"
import styles                from "../../stylesheets/session/Login"
import * as actions          from "../../actions/session";

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch, errors } = this.props;

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
                  dispatch(actions.logInFbBackend(this.context.router, text))
                } />
              <div className="login-button__separator">or</div>
              <LoginEmailPage
                errors = {errors}
                onAddClick={text =>
                  dispatch(actions.logInEmailBackend(this.context.router, text))
                } />
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

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    errors:     state.session.errors,
    isFetching: state.session.isFetching,
    isLoggedIn: state.session.isLoggedIn,
    user:       state.session.user
  };
}

export default connect(select)(LoginPage);
