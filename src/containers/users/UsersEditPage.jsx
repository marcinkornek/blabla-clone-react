import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import { Col }             from 'react-bootstrap'
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
      dispatch(actions.fetchUserProfile(currentUserId))
    }
  }

  render() {
    const { dispatch, isFetching, session, currentUserId } = this.props;
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
            {...this.props}
            onAddClick={(user, files) =>
              dispatch(actions.updateUser(user, files, session))
            } />
        </div>
    }

    userEdit =
      <Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My profile</div>
        </div>
        {userEditForm}
      </Col>

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
    errors:        state.user.errors,
    currentUserId: state.session.user.id,
    session:       state.session.user
  };
}

export default connect(select)(UsersEditPage);
