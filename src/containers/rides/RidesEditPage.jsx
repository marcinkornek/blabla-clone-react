import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import _                     from 'underscore';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesEditPageForm     from '../../components/rides/RidesEditPageForm'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class RidesEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var rideId = this.props.params.rideId
    const { dispatch, session } = this.props;
    dispatch(actions.fetchRidesOptions(session))
    if (rideId) {
      dispatch(actions.fetchRide(rideId, session))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.params.rideId !== this.props.params.rideId) {
      dispatch(actions.fetchRide(nextProps.params.rideId, nextProps.session))
    }
  }

  render() {
    const { dispatch, ride, ridesOptions, session, isSaving, userRides } = this.props;

    return (
      <div className='show-grid'>
        <UserAccountMenu userRides={userRides} />
        <Bootstrap.Col xs={10}>
          <RidesEditPageForm
            ride={ride} isSaving={isSaving}
            ridesOptions={ridesOptions}
            onAddClick={(ride, ride_start, ride_destination) =>
              dispatch(actions.updateRide(ride, ride_start, ride_destination, session))
            } />
        </Bootstrap.Col>
      </div>
    )
  }
}

RidesEditPage.PropTypes = {
  ride: PropTypes.array.isRequired
}

function select(state) {
  return {
    isSaving:      state.ride.isSaving,
    currentUserId: state.session.user.id,
    userRides:     state.user.user.rides,
    ride:          state.ride.ride,
    ridesOptions:  state.ridesOptions.ridesOptions,
    session:       state.session.user
  };
}

export default connect(select)(RidesEditPage);
