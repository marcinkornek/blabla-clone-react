import React, { Component, PropTypes } from 'react'
import NotificationsItem from './NotificationsItem'
import List from 'material-ui/List/List'
import { Link } from 'react-router'

export default class NotificationsList extends React.Component {
  renderNotificationsItems() {
    const { userNotifications, handleOnHover } = this.props
    return(
      userNotifications.items.map((notification, i) =>
        <NotificationsItem
          notification={notification}
          key={i}
          markAsRead={handleOnHover} />)
    )
  }

  render() {
    return(
      <div className='header__notifications'>
        <div className='header__notifications__header'>
          Notifications
        </div>
        {this.renderNotificationsItems()}

        <Link to="/notifications">
          <div className='header__notifications__footer'>
            See all
          </div>
        </Link>
      </div>
    )
  }
}
