import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'

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
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchUser(nextProps.currentUserId))
    }
  }

  render() {
    const { dispatch, isFetching, user, isSaving, session, currentUserId } = this.props;
    var userEdit, userEditForm

    if (isFetching || currentUserId === undefined) {
      userEditForm =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      userEditForm =
        <div>
          <UsersEditPageForm
            user={user} isSaving={isSaving}
            onAddClick={(user, files) =>
              dispatch(actions.updateUser(user, files, session))
            } />
        </div>
    }

    userEdit =
      <Bootstrap.Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My profile</div>
        </div>
        {userEditForm}
      </Bootstrap.Col>

    return (
      <div className='show-grid'>
        <UserAccountMenu />
        {userEdit}
      </div>
    )
  }
}

UsersEditPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.user.isFetching,
    isSaving:      state.user.isSaving,
    user:          state.user.user,
    currentUserId: state.session.user.id,
    session:       state.session.user
  };
}

export default connect(select)(UsersEditPage);