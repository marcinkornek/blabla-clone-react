import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class UsersIndexPageItem extends React.Component {
  render() {
    return (
      <Bootstrap.Panel className='user'>
        <div className='user-details'>
          <Link to={`/users/${this.props.user.id}`}>
          <div className='user-details__name'>{this.props.user.full_name}</div>
          </Link>
          <div className='user-details__email'>{this.props.user.email}</div>
          <div className='user-details__timestamp'>{this.props.user.created_at}</div>
        </div>
        <div className='user-avatar'>
          {this.props.user.avatar}
        </div>
      </Bootstrap.Panel>
    )
  }
}
