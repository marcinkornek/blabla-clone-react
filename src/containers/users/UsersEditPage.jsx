import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import _                     from 'underscore';

import UsersEditPageForm      from '../../components/users/UsersEditPageForm'
import styles                from '../../stylesheets/users/Users'
import * as actions          from '../../actions/users';

export default class UsersEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchUser(currentUserId))
    }
  }

  render() {
    const { dispatch, user, session } = this.props;
    var form
    console.log('session', session)
    if (_.isEmpty(user)) {
      form =
        <div>Login to edit your account</div>
    } else {
      form =
        <UsersEditPageForm
          user={user}
          onAddClick={user =>
            dispatch(actions.updateUser(user, session))
          } />
    }

    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            {form}
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
}

UsersEditPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    session:       state.session.user,
    currentUserId: state.session.user.id,
    user:          state.user.user
  };
}

export default connect(select)(UsersEditPage);
