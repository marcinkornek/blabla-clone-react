import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import UsersEditPageForm     from '../../components/users/UsersEditPageForm'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.params', nextProps.params)
  }

  render() {
    const { dispatch, user, session, isSaving } = this.props;

    console.log('user!!!!!!!', user)
    var userEditForm =
      <Bootstrap.Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My profile</div>
        </div>
        <UsersEditPageForm
          user={user} isSaving={isSaving}
          onAddClick={(user, files) =>
            dispatch(actions.updateUser(user, files, session))
          } />
      </Bootstrap.Col>

    return (
      <div className='show-grid'>
        <UserAccountMenu />
        {userEditForm}
      </div>
    )
  }
}

UsersEditPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    isSaving:      state.user.isSaving,
    session:       state.session.user,
    currentUserId: state.session.user.id,
    user:          state.user.user
  };
}

export default connect(select)(UsersEditPage);
