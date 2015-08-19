import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class UsersIndexItem extends React.Component {
  render() {
    return (
      <div className='user'>
        <div className='user-details'>
          <Link to={`/users/${this.props.user.id}`}>About</Link>
          {this.props.user.email}
          {this.props.user.first_name}
          {this.props.user.last_name}
          {this.props.user.created_at}
        </div>
        <div className='user-avatar'>
          {this.props.user.avatar}
        </div>
      </div>
    )
  }
}
