import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import pluralize             from 'pluralize'

import styles                from '../../stylesheets/rides/Rides'
import Stars                 from '../shared/Stars'

export default class RidesIndexPageItem extends React.Component {
  render() {
    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.ride.comfort}</Bootstrap.Tooltip>
    );

    var rideStatus, rideDescription, rideDriver, rideOffer

    rideStatus =
      <div className='ride-status'>
        <div className='ride-status__label'>{this.props.ride.status}</div>
      </div>

    rideDescription =
      <div className='ride-description'>
        <div className='ride-description__start_date'>
          <Timestamp value={this.props.ride.start_date} format="dddd DD MMMM - HH:mm" />
        </div>
        <div className='ride-description__start-city'>{this.props.ride.start_city}</div>
        <Icon name="long-arrow-right" className='ride-description__arrow'/>
        <div className='ride-description__destination-city'>{this.props.ride.destination_city}</div>

        <div className='ride-description__car'>
         <div className='ride-description__car-label'>car:</div>
         <div className='ride-description__car-name'>{this.props.ride.car.full_name}</div>
          <Stars stars={this.props.ride.car.comfort_stars} label={this.props.ride.car.comfort} />
        </div>
      </div>

    rideDriver =
      <div className='ride-driver'>
        <div className='ride-driver__avatar'>
          <img src={this.props.ride.driver.avatar} />
        </div>
        <div className='ride-driver__info'>
          <div className='ride-driver__name'>{this.props.ride.driver.full_name}</div>
          <div className='ride-driver__age'>({this.props.ride.driver.age} years)</div>
        </div>
      </div>

    rideOffer =
      <div className='ride-offer'>
        <div className='ride-offer__price'>
          <div className='ride-offer__price-value'>{this.props.ride.price}</div>
          <div className='ride-offer__price-currency'>{this.props.ride.currency}</div>
          <div className='ride-offer__price-lebel'>for person</div>
        </div>
        <div className='ride-offer__places'>
          <div className='ride-offer__places-free'>{this.props.ride.free_places_count}</div>
          <div className='ride-offer__places-label'>{pluralize('place', this.props.ride.free_places_count)} free</div>
        </div>
      </div>

    return (
      <Link to={`/rides/${this.props.ride.id}`}>
        <div className='ride'>
          {rideStatus}
          {rideDescription}
          {rideDriver}
          {rideOffer}
        </div>
      </Link>
    )
  }
}
