import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import { Tooltip }             from 'react-bootstrap'
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import pluralize             from 'pluralize'

import styles                from '../../stylesheets/rides/Rides'
import Stars                 from '../shared/Stars'

export default class RidesIndexSimplePageItem extends React.Component {
  render() {
    const tooltipComfort = (
      <Tooltip id='tooltip-comfort'>{this.props.ride.comfort}</Tooltip>
    )

    var rideDescription, rideOffer

    rideDescription =
      <div className='ride-simple-description'>
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

    rideOffer =
      <div className='ride-offer'>
        <div className='ride-offer__price'>
          <div className='ride-offer__price-value'>{this.props.ride.price}</div>
          <div className='ride-offer__price-currency'>{this.props.ride.currency}</div>
          <div className='ride-offer__price-lebel'>for person</div>
        </div>
        <div className='ride-offer__places'>
          <div className='ride-offer__places-free'>{this.props.ride.free_places_count}</div>
          <div className='ride-offer__places-label'>/ {this.props.ride.places} {pluralize('place', this.props.ride.free_places_count)} free</div>
        </div>
      </div>

    return (
      <Link to={`/rides/${this.props.ride.id}`}>
        <div className='ride'>
          {rideDescription}
          {rideOffer}
        </div>
      </Link>
    )
  }
}
