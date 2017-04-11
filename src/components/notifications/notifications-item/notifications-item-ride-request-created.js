import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Timestamp from 'react-time'
import TimeAgo from 'react-timeago'

export const RideRequestCreated = ({ notification }) => {
  return (
    <div className='notification__body'>
      <Link to={`/users/${notification.sender.id}`} className='notification__link'>
        {notification.sender.full_name}
      </Link>
      {' added ride request for your ride '}
      <Link to={`/rides/${notification.ride.id}`} className='notification__link'>
        {notification.ride.start_location_address} - {notification.ride.destination_location_address} {'on '}
        <Timestamp value={notification.ride.start_date} format="dddd DD MMMM - HH:mm " />
      </Link>
      <TimeAgo className='notification__timestamp' date={notification.created_at} />
    </div>
  )
}

RideRequestCreated.propTypes = {
  notification: PropTypes.object.isRequired
}
