import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexSimplePageItem'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class RidesDriverIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchRidesAsDriver(currentUserId))
    }
  }

  render() {
    const { rides, currentUserId } = this.props
    var ridesMain, ridesList, headingButton

    if (_.isEmpty(rides)) {
      ridesList = 'No rides'
    } else {
      ridesList = rides.map((ride, i) =>
        <RidesItem ride={ride} key={i} />
      )
    }

    if (currentUserId) {
      headingButton =
        <div className='account__heading-button'>
          <Link to='/rides/new'><Bootstrap.Button bsStyle='primary' bsSize='small'>New ride</Bootstrap.Button></Link>
        </div>
    }

    ridesMain =
      <Bootstrap.Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My rides as driver</div>
          {headingButton}
        </div>
        {ridesList}
      </Bootstrap.Col>

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

RidesDriverIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

function select(state) {
  return {
    rides:          state.ridesDriver['rides'],
    currentUserId:  state.session.user.id
  };
}

export default connect(select)(RidesDriverIndexPage);
