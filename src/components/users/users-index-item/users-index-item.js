// utils
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

export class UsersIndexItem extends Component {
  render() {
    const { user } = this.props

    return (
      <Link to={`/users/${user.id}`} className='user'>
        <ListItem
          leftAvatar={
            <Avatar src={user.avatar} />
          }
        >
          {user.full_name}
        </ListItem>
      </Link>
    )
  }
}
