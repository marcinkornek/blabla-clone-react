import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'

export default class UsersIndexPageItem extends Component {
  render() {
    const { user } = this.props

    return (
      <Link to={`/users/${user.id}`}>
        <Panel className='user'>
          <div className='user-details'>
            <div className='user-details__name'>{user.full_name}</div>
            <div className='user-details__email'>{user.email}</div>
            <div className='user-details__timestamp'>{user.created_at}</div>
          </div>
          <div className='user-avatar'>
            <img src={user.avatar}/>
          </div>
        </Panel>
      </Link>
    )
  }
}
