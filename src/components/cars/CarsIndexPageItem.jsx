import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'
import CarsActions from './CarsActions'
import Stars from '../shared/Stars'

export default class CarsIndexPageItem extends Component {
  render() {
    const { car, currentUserId } = this.props
    var carsActions
    if (car.owner_id === currentUserId) {
      carsActions = <CarsActions carId={car.id} />
    }

    return (
      <Panel className='car'>
        <div className='car-details'>
          <Link to={`/cars/${car.id}`}>
            <div className='car-details__name'>{car.full_name}</div>
          </Link>
          <div className='car-details__places'>{car.places_full}</div>
          <Stars stars={car.comfort_stars} label={car.comfort} />
          {carsActions}
        </div>
        <Link to={`/cars/${car.id}`}>
          <div className='car-photo'>
            <img src={car.car_photo} />
          </div>
        </Link>
      </Panel>
    )
  }
}
