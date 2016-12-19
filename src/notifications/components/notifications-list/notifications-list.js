// utils
import React, { Component, PropTypes } from 'react'
import List from 'material-ui/List/List'
import { Link } from 'react-router'

// components
import { NotificationsItem } from '../notifications-item/notifications-item'

export class NotificationsList extends Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired,
    markAsSeen: PropTypes.func.isRequired
  }

  renderNotificationsItems() {
    const { notifications, markAsSeen } = this.props
    if (notifications.pagination.total_count > 0) {
      return (
        notifications.items.map((notification, i) =>
          <NotificationsItem
            key={i}
            notification={notification}
            markAsSeen={markAsSeen}
          />
        )
      )
    } else {
      return (
        <div className='header__notifications__empty'>
          no new notifications
        </div>
      )
    }
  }

  renderNotificationsFooter() {
    const { notifications } = this.props
    if (notifications.pagination.total_count > 0) {
      return (
        <Link to="/notifications">
          <div className='header__notifications__footer'>
            See all
          </div>
        </Link>
      )
    }
  }

  render() {
    return (
      <div>
        <div className='header__notifications__header'>
          Notifications
        </div>
        {this.renderNotificationsItems()}
        {this.renderNotificationsFooter()}
      </div>
    )
  }
}
