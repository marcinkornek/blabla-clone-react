import React, { Component, PropTypes } from 'react'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'
import Timestamp from 'react-time'
import TimeAgo from 'react-timeago'
import classNames from 'classnames'

export default class NotificationsItem extends React.Component {
  static PropTypes = {
    notification: PropTypes.object.isRequired,
    markAsSeen: PropTypes.func.isRequired
  }

  renderNotification(notification) {
    switch (notification.notification_type) {
    case "ride_request_created":
      return this.rideRequestCreated(notification)
    case "ride_request_accepted":
      return this.rideRequestAccepted(notification)
    case "ride_request_rejected":
      return this.rideRequestRejected(notification)
    }
  }

  onMouseOverAction() {
    const { markAsSeen, notification } = this.props

    if (!notification.seen_at) {
      markAsSeen(notification.id)
    }
  }

  rideRequestCreated(notification) {
    return(
      <div className='header__notification__body'>
        <Link to={`/users/${notification.sender.id}`} className='header__notification__link'>
          {notification.sender.full_name}
        </Link>
        {' added ride request for your ride '}
        <Link to={`/rides/${notification.ride.id}`} className='header__notification__link'>
          {notification.ride.start_city} - {notification.ride.destination_city} {'on '}
          <Timestamp value={notification.ride.start_date} format="dddd DD MMMM - HH:mm" />
        </Link>
        <TimeAgo className='header__notification__timestamp' date={notification.created_at} />
      </div>
    )
  }

  rideRequestAccepted(notification) {
    return(
      <div className='header__notification__body'>
        <Link to={`/users/${notification.sender.id}`} className='header__notification__link'>
          {notification.sender.full_name}
        </Link>
        {' accepted your ride request in ride '}
        <Link to={`/rides/${notification.ride.id}`} className='header__notification__link'>
          {notification.ride.start_city} - {notification.ride.destination_city} {'on '}
          <Timestamp value={notification.ride.start_date} format="dddd DD MMMM - HH:mm" />
        </Link>
        <TimeAgo className='header__notification__timestamp' date={notification.created_at} />
      </div>
    )
  }

  rideRequestRejected(notification) {
    return(
      <div className='header__notification__body'>
        <Link to={`/users/${notification.sender.id}`} className='header__notification__link'>
          {notification.sender.full_name}
        </Link>
        {' rejected your ride request in ride '}
        <Link to={`/rides/${notification.ride.id}`} className='header__notification__link'>
          {notification.ride.start_city} - {notification.ride.destination_city} {'on '}
          <Timestamp value={notification.ride.start_date} format="dddd DD MMMM - HH:mm" />
        </Link>
        <TimeAgo className='header__notification__timestamp' date={notification.created_at} />
      </div>
    )
  }

  render() {
    const { notification } = this.props
    return(
      <div className={classNames('header__notification', {'header__notification--seen' : notification.seen_at})} onMouseOver={this.onMouseOverAction.bind(this)}>
        <Link to={`/users/${notification.sender.id}`}>
          <Avatar src={notification.sender.avatar} />
        </Link>
        {this.renderNotification(notification)}
      </div>
    )
  }
}
