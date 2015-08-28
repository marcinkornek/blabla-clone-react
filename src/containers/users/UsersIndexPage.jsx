import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import UsersItem             from '../../components/users/UsersIndexPageItem'

export default class UsersIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchUsers());
  }

  render() {
    const { isFetching, users } = this.props

    var usersList
    if (users) {
      usersList = users.map((user, i) =>
        <UsersItem user={user} key={i} />
      )
    } else {
      usersList = 'No users'
    }

    return (
      <div className='users'>
        {usersList}
      </div>
    )
  }
}

UsersIndexPage.PropTypes = {
  users: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching: state.users['isFetching'],
    users:      state.users['users']
  };
}

export default connect(select)(UsersIndexPage);
