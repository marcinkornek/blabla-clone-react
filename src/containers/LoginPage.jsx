import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import LoginFbPage           from '../components/javascripts/session/LoginFbPage'
import LoginEmailPage        from '../components/javascripts/session/LoginEmailPage'
import styles                from '../components/stylesheets/session/LoginPage'
import { logInBackend }      from '../actions/session';

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            <LoginFbPage />
            <LoginEmailPage 
              onAddClick={text =>
                dispatch(logInBackend(text))
              } />
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
}

LoginPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    session: {
      isFetching: state.session['isFetching'],
      isLoggedIn: state.session['isLoggedIn'],
      user: {
        accessToken: state.session.user['accessToken'],
        email: state.session.user['email'],
        permissions: state.session.user['permissios']
      }
    }
  };
}

export default connect(select)(LoginPage);