// utils
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

export const UsersIndexItem = ({user}) => (
  <Link to={`/users/${user.id}`} className='user'>
    <ListItem leftAvatar={<Avatar src={user.avatar} />}>
      {user.full_name}
    </ListItem>
  </Link>
)

UsersIndexItem.propTypes = {
  user: PropTypes.object.isRequired,
}
