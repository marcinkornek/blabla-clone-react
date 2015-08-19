import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import UsersNewPageForm      from '../../components/users/UsersNewPageForm'
import styles                from '../../stylesheets/users/Users'
import * as actions          from '../../actions/users';

export default class RegisterPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            <UsersNewPageForm
              onAddClick={text =>
                dispatch(actions.createUser(text))
              } />
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
  };
}

export default connect(select)(RegisterPage);
