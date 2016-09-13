import React, { Component, PropTypes } from 'react'
import NotificationsItem from './NotificationsItem'
import List from 'material-ui/List/List'
import { Link } from 'react-router'

export default class NotificationsList extends React.Component {
  render() {
    const { userNotifications } = this.props

    var notificationsItems =
      userNotifications.items.map((notification, i) =>
        <NotificationsItem notification={notification} key={i} />)

    return(
      <div className='header__notifications'>
        <div className='header__notifications__header'>
          Notifications
        </div>
        {notificationsItems}

        <Link to="/notification">
          <div className='header__notifications__footer'>
            See all
          </div>
        </Link>
      </div>
    )
  }
}
