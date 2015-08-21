import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import * as actions          from '../../actions/users';

export default class UsersShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var userId = this.props.params.userId
    const { dispatch } = this.props;
    dispatch(actions.fetchUser(userId));
  }

  render() {
    const { isFetching, user } = this.props
    return (
      <div className='users'>
        {user.first_name}
        {user.last_name}
        {user.email}
      </div>
    )
  }
}

UsersShowPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching: state.user['isFetching'],
    user:       state.user['user']
  };
}

export default connect(select)(UsersShowPage);
