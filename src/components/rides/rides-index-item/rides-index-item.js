// utils
import React, { Component, PropTypes }  from 'react'
import { Link } from 'react-router'
import { Tooltip } from 'react-bootstrap'
import Timestamp from 'react-time'
import Icon from 'react-fa'
import pluralize from 'pluralize'

// components
import { RenderUserAge } from '../../shared/render-user-age/render-user-age'
import { Stars } from '../../shared/stars/stars'

export class RidesIndexItem extends Component {
  render() {
    const { ride } = this.props
    const tooltipComfort = (
      <Tooltip id='tooltip-comfort'>{ride.comfort}</Tooltip>
    )

    var rideStatus, rideDescription, rideDriver, rideOffer

    rideStatus =
      <div className='ride-status'>
        <div className='ride-status__label'>{ride.status}</div>
      </div>

    rideDescription =
      <div className='ride-description'>
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

    rideDriver =
      <div className='ride-driver'>
        <div className='ride-driver__avatar'>
          <img src={ride.driver.avatar} />
        </div>
        <div className='ride-driver__info'>
          <div className='ride-driver__name'>{ride.driver.full_name}</div>
          <div className='ride-driver__age'><RenderUserAge user={ride.driver} /></div>
        </div>
      </div>

    rideOffer =
      <div className='ride-offer'>
        <div className='ride-offer__price'>
          <div className='ride-offer__price-value'>{ride.price}</div>
          <div className='ride-offer__price-currency'>{ride.currency}</div>
          <div className='ride-offer__price-label'>for person</div>
        </div>
        <div className='ride-offer__places'>
          <div className='ride-offer__places-free'>{ride.free_places_count}</div>
          <div className='ride-offer__places-label'>/ {ride.places} {pluralize('place', ride.free_places_count)} free</div>
        </div>
      </div>

    return (
      <Link to={`/rides/${ride.id}`}>
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
