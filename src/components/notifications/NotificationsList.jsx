import React, { Component, PropTypes } from 'react'
import NotificationsItem from './NotificationsItem'
import List from 'material-ui/List/List'
import { Link } from 'react-router'

export default class NotificationsList extends React.Component {
  static PropTypes = {
    notifications: PropTypes.array.isRequired,
    handleOnHover: PropTypes.func.isRequired
  }

  renderNotificationsItems() {
    const { notifications, handleOnHover } = this.props
    if (notifications.pagination.total_count > 0) {
      return(
        notifications.items.map((notification, i) =>
          <NotificationsItem
            notification={notification}
            key={i}
            markAsRead={handleOnHover} />)
      )
    } else {
      return(
        <div className='header__notifications__empty'>
          no new notifications
        </div>
      )
    }
  }

  renderNotificationsFooter() {
    const { notifications } = this.props
    if (notifications.pagination.total_count > 0) {
      return(
        <Link to="/notifications">
          <div className='header__notifications__footer'>
            See all
          </div>
        </Link>
      )
    }
  }

  render() {
    return(
      <div className='header__notifications'>
        <div className='header__notifications__header'>
          Notifications
        </div>
        {this.renderNotificationsItems()}
        {this.renderNotificationsFooter()}
      </div>
    )
  }
}
