import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../components/stylesheets/users/Users'
import UsersItem             from '../../components/javascripts/users/UsersIndexItem'
import * as actions          from '../../actions/users';

export default class UsersPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { dispatch } = this.props;
    dispatch(actions.fetchUsers());
  }

  render() {
    const { isFetching, items } = this.props
    var users
    if (items) {
      users = items.map((user, i) =>
        <UsersItem user={user} key={i} />
      )
    } else {
      users = 'No users'
    }

    return (
      <div className='users'>
        {users}
      </div>
    )
  }
}

UsersPage.PropTypes = {
  items: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching: state.users['isFetching'],
    items: state.users['items']
  };
}

export default connect(select)(UsersPage);
