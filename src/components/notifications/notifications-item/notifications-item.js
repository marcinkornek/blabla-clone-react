// utils
import React, { Component, PropTypes } from 'react'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'
import classNames from 'classnames'

// components
import { RideRequestCreated } from './notifications-item-ride-request-created'
import { RideRequestUpdated } from './notifications-item-ride-request-updated'

export class NotificationsItem extends React.Component {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    markAsSeen: PropTypes.func.isRequired
  }

  renderNotification(notification) {
    switch (notification.notification_type) {
    case "ride_request_created":
      return(<RideRequestCreated notification={notification} />)
    case "ride_request_accepted":
    case "ride_request_rejected":
      return(<RideRequestUpdated notification={notification} />)
    }
  }

  onMouseOverAction() {
    const { markAsSeen, notification } = this.props

    if (!notification.seen_at) markAsSeen(notification.id)
  }

  render() {
    const { notification } = this.props

    return (
      <div
        className={classNames('header__notification', {'header__notification--seen' : notification.seen_at})}
        onMouseOver={this.onMouseOverAction.bind(this)}
      >
        <Link to={`/users/${notification.sender.id}`}>
          <Avatar src={notification.sender.avatar} />
        </Link>
        {this.renderNotification(notification)}
      </div>
    )
  }
}
