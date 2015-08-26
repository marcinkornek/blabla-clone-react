import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../../stylesheets/users/Users'
import Icon                  from 'react-fa'
import CarsActions           from './CarsActions'

export default class CarsIndexPageItem extends React.Component {
  render() {
    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.car.comfort}</Bootstrap.Tooltip>
    );

    var starsIcons = []
    for (var i = 0; i < this.props.car.comfort_stars; i++) {
      starsIcons.push(<Icon name='star' />);
    }

    var stars =
      <Bootstrap.OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='car-details__stars'>
          {starsIcons}
        </div>
      </Bootstrap.OverlayTrigger>

    var carsActions
    if (this.props.car.owner_id === this.props.currentUserId) {
      carsActions = <CarsActions carId={this.props.car.id} />
    }

    return (
      <div className='car'>
        <div className='car-name'>
          <Link to={`/cars/${this.props.car.id}`}>{this.props.car.full_name}</Link>
        </div>
        <div className='car-details'>
          <div className='car-details__places'>
            {this.props.car.places_full}
          </div>
          {stars}
        </div>
        {carsActions}
      </div>
    )
  }
}
