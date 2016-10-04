import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Panel } from 'react-bootstrap'
import CarsActions from '../car-actions/car-actions'
import Stars from '../../shared/Stars'

export default class CarsIndexItem extends Component {
  renderCarsActions() {
    const { car, currentUserId } = this.props
    if (car.owner_id === currentUserId) {
      return(<CarsActions carId={car.id} />)
    }
  }

  render() {
    const { car } = this.props

    return (
      <Panel className='car'>
        <div className='car-details'>
          <Link to={`/cars/${car.id}`}>
            <div className='car-details__name'>{car.full_name}</div>
          </Link>
          <div className='car-details__places'>{car.places_full}</div>
          <Stars stars={car.comfort_stars} label={car.comfort} />
          {this.renderCarsActions()}
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
