import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/UsersPage'

export default class UsersItem extends React.Component {
  render() {
    return (
      <div className='user'>
        <div className='user-details'>
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
