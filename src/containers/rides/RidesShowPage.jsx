import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import { Link }              from 'react-router';
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesActions          from '../../components/rides/RidesActions'

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

    var rideDescriptionCar
    if (_.isEmpty(ride)) {
      rideDescriptionCar = null
    } else {
      rideDescriptionCar =
        <div>
          <Link to={`/cars/${ride.car.id}`}>
            <div className='ride-show-description__details'>
              <div className='ride-show-description__details-label'>Car name</div>
              <div className='ride-show-description__details-value'>{ride.car.full_name}</div>
            </div>
            <div className='ride-show-description__details'>
              <div className='ride-show-description__details-label'>Car photo</div>
              <div className='ride-show-description__details-value'><img src={ride.car.car_photo} /></div>
            </div>
          </Link>
        </div>
    }

    var rideDriver
    if (_.isEmpty(ride)) {
      rideDriver = null
    } else {
      rideDriver =
        <div className='ride-show-driver'>
          <div className='ride-show-driver__heading'>
            User
          </div>
          <Link to={`/users/${ride.driver.id}`}>
            <div>
              <div className='ride-show-driver__details-avatar'><img src={ride.driver.avatar} /></div>
              <div className='ride-show-driver__details-info'>
                <div className='ride-show-driver__details-name'>{ride.driver.full_name}</div>
                <div className='ride-show-driver__details-age'>({ride.driver.age} years)</div>
                <div className='ride-show-driver__details-join'>
                  <div className='ride-show-driver__details-join-label'>joined:</div>
                  <div className='ride-show-driver__details-join-value'>
                    <Timestamp value={ride.driver.created_at} format="D MMMM YYYY" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
    }

    var rideActions
    if (_.isEmpty(ride)) {
      rideActions = null
    } else {
      rideActions =
        <RidesActions rideId={ride.id} rideOwner={ride.driver.id} currentUserId={currentUserId} />
    }

    var rideOffer =
      <div className='ride-show-offer'>
        <div className='ride-show-offer__heading'>
          Offer
        </div>
        <div className='ride-show-offer__details-price'>
          <div className='ride-show-offer__details-price-value'>{ride.price}</div>
          <div className='ride-show-offer__details-price-currency'>{ride.currency}</div>
          <div className='ride-show-offer__details-price-label'>for person</div>
        </div>
        <div className='ride-show-offer__details-seats'>
          <div className='ride-show-offer__details-seats-value'>{ride.seats_full}</div>
        </div>
        <div className='ride-show-offer__details-book'>
          <div className='ride-show-offer__details-book-info'>
          </div>
        </div>
      </div>


    var rideDescription =
      <div className='ride-show-description'>
        <div className='ride-show-description__heading'>
          <div className='ride-show-description__start-city'>{ride.start_city}</div>
          <Icon name="long-arrow-right" className='ride-show-description__arrow'/>
          <div className='ride-show-description__destination-city'>{ride.destination_city}</div>
          <div className='ride-show-description__actions'>
            {rideActions}
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Start city</div>
          <div className='ride-show-description__details-value'>{ride.start_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Destination city</div>
          <div className='ride-show-description__details-value'>{ride.destination_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Date</div>
          <div className='ride-show-description__details-value'>
            <Timestamp value={ride.start_date} format="dddd D MMMM YYYY" />
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Time</div>
          <div className='ride-show-description__details-value'>
            <Timestamp value={ride.start_date} format="H:mm" />
          </div>
        </div>
        {rideDescriptionCar}
      </div>

    return (
      <div className='show-grid'>
        <Bootstrap.Col xs={8}>
          {rideDescription}
        </Bootstrap.Col>
        <Bootstrap.Col xs={4}>
          {rideOffer}
          {rideDriver}
        </Bootstrap.Col>
      </div>
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
