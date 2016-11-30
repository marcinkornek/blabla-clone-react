import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Timestamp from 'react-time'
import TimeAgo from 'react-timeago'

export const RideRequestUpdated = ({ notification }) => {
  return (
    <div className='header__notification__body'>
      <Link to={`/users/${notification.sender.id}`} className='header__notification__link'>
        {notification.sender.full_name}
      </Link>
      {notification.notification_type == 'ride_request_accepted' ? ' accepted' : ' rejected'}
      {' your ride request in ride '}
      <Link to={`/rides/${notification.ride.id}`} className='header__notification__link'>
        {notification.ride.start_city} - {notification.ride.destination_city} {'on '}
        <Timestamp value={notification.ride.start_date} format="dddd DD MMMM - HH:mm" />
      </Link>
      <TimeAgo className='header__notification__timestamp' date={notification.created_at} />
    </div>
  )
}

RideRequestUpdated.propTypes = {
  notification: PropTypes.object.isRequired
}
