import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import { Link }              from 'react-router';
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'

export default class RidesShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var rideId = this.props.params.rideId
    const { dispatch } = this.props;
    dispatch(actions.fetchRide(rideId));
  }

  render() {
    const { ride, currentUserId } = this.props

    var rideCar, rideDriver
    if (_.isEmpty(ride)) {
      rideDriver = rideCar = null
    } else {
      rideCar =
        <div className='ride-details__car'>
          <Link to={`/cars/${ride.car.id}`}>
            {ride.car.full_name}
          </Link>
        </div>
      rideDriver =
        <div className='ride-details__driver'>
          <Link to={`/users/${ride.driver.id}`}>
            {ride.driver.full_name}
          </Link>
        </div>
    }

    var rideDetails =
      <Bootstrap.Panel className='ride'>
        <div className='ride-details'>
          <Link to={`/rides/${ride.id}`}>
            <div className='ride-details__start-city'>{ride.start_city}</div>
            <div className='ride-details__destination-city'>{ride.destination_city}</div>
          </Link>
          <div className='ride-details__places'>{ride.seats}</div>
          <div className='ride-details__places'>{ride.price}</div>
        </div>
        {rideDriver}
        {rideCar}
      </Bootstrap.Panel>

    return (
      <Bootstrap.Grid className='ride'>
        {rideDetails}
      </Bootstrap.Grid>
    )
  }
}

RidesShowPage.PropTypes = {
  ride: PropTypes.array.isRequired
}

function select(state) {
  return {
    ride:           state.ride['ride'],
    currentUserId: state.session.user.id
  };
}

export default connect(select)(RidesShowPage);
