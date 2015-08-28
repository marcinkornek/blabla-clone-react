import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class UsersIndexPageItem extends React.Component {
  render() {
    return (
      <Link to={`/users/${this.props.user.id}`}>
        <Bootstrap.Panel className='user'>
          <div className='user-details'>
            <div className='user-details__name'>{this.props.user.full_name}</div>
            <div className='user-details__email'>{this.props.user.email}</div>
            <div className='user-details__timestamp'>{this.props.user.created_at}</div>
          </div>
          <div className='user-avatar'>
            <img src={this.props.user.avatar}/>
          </div>
        </Bootstrap.Panel>
      </Link>
    )
  }
}
