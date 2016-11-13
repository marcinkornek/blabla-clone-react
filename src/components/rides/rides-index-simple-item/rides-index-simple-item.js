import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Tooltip } from 'react-bootstrap'
import Timestamp from 'react-time'
import Icon from 'react-fa'
import pluralize from 'pluralize'

// components
import { Stars } from '../../shared/stars/stars'

export class RidesIndexSimpleItem extends Component {
  render() {
    const { ride } = this.props
    const tooltipComfort = (
      <Tooltip id='tooltip-comfort'>{ride.comfort}</Tooltip>
    )

    var rideDescription, rideOffer

    rideDescription =
      <div className='ride-simple-description'>
        <div className='ride-description__start_date'>
          <Timestamp value={ride.start_date} format="dddd DD MMMM - HH:mm" />
        </div>
        <div className='ride-description__start-city'>{ride.start_city}</div>
        <Icon name="long-arrow-right" className='ride-description__arrow'/>
        <div className='ride-description__destination-city'>{ride.destination_city}</div>

        <div className='ride-description__car'>
         <div className='ride-description__car-label'>car:</div>
         <div className='ride-description__car-name'>{ride.car.full_name}</div>
          <Stars stars={ride.car.comfort_stars} label={ride.car.comfort} />
        </div>
      </div>

    rideOffer =
      <div className='ride-offer'>
        <div className='ride-offer__price'>
          <div className='ride-offer__price-value'>{ride.price}</div>
          <div className='ride-offer__price-currency'>{ride.currency}</div>
          <div className='ride-offer__price-lebel'>for person</div>
        </div>
        <div className='ride-offer__places'>
          <div className='ride-offer__places-free'>{ride.free_places_count}</div>
          <div className='ride-offer__places-label'>/ {ride.places} {pluralize('place', ride.free_places_count)} free</div>
        </div>
      </div>

    return (
      <Link to={`/rides/${ride.id}`}>
        <div className='ride'>
          {rideDescription}
          {rideOffer}
        </div>
      </Link>
    )
  }
}
