import React, { PropTypes }  from 'react';
import { Col }               from 'react-bootstrap'
import { connect }           from 'react-redux';

import LoginFbPage           from '../../components/session/LoginFbPage'
import LoginEmailPage        from '../../components/session/LoginEmailPage'
import styles                from '../../stylesheets/session/Login'
import * as actions          from '../../actions/session';

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch, errors } = this.props;
    return (
      <div className='show-grid'>
        <Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <LoginFbPage
            onDataReceive={text =>
              dispatch(actions.logInFbBackend(this.context.router, text))
            } />
          <LoginEmailPage
            errors = {errors}
            onAddClick={text =>
              dispatch(actions.logInEmailBackend(this.context.router, text))
            } />
        </Col>
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
