import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/UsersPage'
import UsersItem             from './UsersItem'

export default class UsersPage extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {users: props.users};
  }

  render() {
    var users
    if (this.props.users) {
      users = this.props.users.map((user, i) =>
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
  users: PropTypes.array.isRequired
}

// UsersPage.defaultProps = {
//   users: [
//     {email: 'a1@a.com', firstName: 'a1', lastName: 'a2', createdAt: '12/12/2014', avatar: ''},
//     {email: 'a2@a.com', firstName: 'b1', lastName: 'b2', createdAt: '22/12/2013', avatar: ''}
//   ]
// }
