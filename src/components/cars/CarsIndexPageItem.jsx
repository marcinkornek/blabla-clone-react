import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'

import styles                from '../../stylesheets/users/Users'
import CarsActions           from './CarsActions'
import Stars                 from '../shared/Stars'

export default class CarsIndexPageItem extends React.Component {
  render() {
    var carsActions
    if (this.props.car.owner_id === this.props.currentUserId) {
      carsActions = <CarsActions carId={this.props.car.id} />
    }

    return (
      <Bootstrap.Panel className='car'>
        <div className='car-details'>
          <Link to={`/cars/${this.props.car.id}`}>
            <div className='car-details__name'>{this.props.car.full_name}</div>
          </Link>
          <div className='car-details__places'>{this.props.car.places_full}</div>
          <Stars stars={this.props.car.comfort_stars} label={this.props.car.comfort} />
          {carsActions}
        </div>
        <Link to={`/cars/${this.props.car.id}`}>
          <div className='car-photo'>
            <img src={this.props.car.car_photo} />
          </div>
        </Link>
      </Bootstrap.Panel>
    )
  }
}
