import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexPageItem'

export default class RidesIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, session, currentUserId } = this.props;
    dispatch(actions.fetchRides(session))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchRides(nextProps.session))
    }
  }

  render() {
    const { isFetching, rides, currentUserId } = this.props
    var ridesMain, ridesSearch, ridesList, headingButton

    if (isFetching) {
      ridesList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      if (rides) {
        ridesList = rides.map((ride, i) =>
          <RidesItem ride={ride} key={i} />
        )
      } else {
        ridesList = 'No rides'
      }
    }

    if (currentUserId) {
      headingButton =
        <div className='heading__button'>
          <Link to='/rides/new'><Bootstrap.Button bsStyle='primary'>New ride</Bootstrap.Button></Link>
        </div>
    }

    ridesSearch =
      <Bootstrap.Col xs={2}>
        Search
      </Bootstrap.Col>

    ridesMain =
      <Bootstrap.Col xs={10}>
        <div className='heading'>
          <div className='heading__title'>Rides</div>
          {headingButton}
        </div>
        {ridesList}
      </Bootstrap.Col>

    return (
      <div className='show-grid'>
        <div className='rides'>
          {ridesSearch}
          {ridesMain}
        </div>
      </div>
    )
  }
}

RidesIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:     state.rides.isFetching,
    rides:          state.rides.rides,
    currentUserId:  state.session.user.id,
    session:        state.session.user
  };
}

export default connect(select)(RidesIndexPage);
