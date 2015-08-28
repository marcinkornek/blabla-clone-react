import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/rides/Rides'
import Icon                  from 'react-fa'

export default class RidesIndexPageItem extends React.Component {
  render() {
    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.ride.comfort}</Bootstrap.Tooltip>
    );

    return (
      <Bootstrap.Panel className='ride'>
        <div className='ride-details'>
          <Link to={`/rides/${this.props.ride.id}`}>
            <div className='ride-details__start-city'>{this.props.ride.start_city}</div>
            <div className='ride-details__destination-city'>{this.props.ride.destination_city}</div>
          </Link>
          <div className='ride-details__places'>{this.props.ride.seats}</div>
          <div className='ride-details__places'>{this.props.ride.price}</div>
        </div>
        <div className='ride-details__driver'>
          <Link to={`/users/${this.props.ride.driver.id}`}>
            {this.props.ride.driver.full_name}
          </Link>
        </div>
        <div className='ride-details__car'>
          <Link to={`/cars/${this.props.ride.car.id}`}>
            {this.props.ride.car.full_name}
          </Link>
        </div>
      </Bootstrap.Panel>
    )
  }
}
