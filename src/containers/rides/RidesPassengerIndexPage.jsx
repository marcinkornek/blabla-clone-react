import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexPageItem'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class RidesPassengerIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId, session } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchRidesAsPassenger(currentUserId, session))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchRidesAsPassenger(nextProps.currentUserId, nextProps.session))
    }
  }

  render() {
    const { isFetching, rides, currentUserId } = this.props
    var ridesMain, ridesList

    if (isFetching || currentUserId === undefined) {
      ridesList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      if (_.isEmpty(rides)) {
        ridesList = 'No rides'
      } else {
        ridesList = rides.map((ride, i) =>
          <RidesItem ride={ride} key={i} />
        )
      }
    }

    ridesMain =
      <Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My rides as passenger</div>
        </div>
        {ridesList}
      </Col>

    return (
      <div className='show-grid'>
        <div className='rides'>
          <UserAccountMenu />
          {ridesMain}
        </div>
      </div>
    )
  }
}

RidesPassengerIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.ridesPassenger.isFetching,
    rides:         state.ridesPassenger.rides,
    currentUserId: state.session.user.id,
    session:       state.session.user
  };
}

export default connect(select)(RidesPassengerIndexPage);
