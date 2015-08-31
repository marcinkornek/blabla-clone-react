import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesItem              from '../../components/rides/RidesIndexPageItem'

export default class RidesIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchRides());
  }

  render() {
    const { rides } = this.props

    var ridesList
    if (rides) {
      ridesList = rides.map((ride, i) =>
        <RidesItem ride={ride} key={i} />
      )
    } else {
      ridesList = 'No rides'
    }

    var ridesMain, ridesSearch

    ridesSearch =
      <Bootstrap.Col xs={2}>
        Search
      </Bootstrap.Col>

    ridesMain =
      <Bootstrap.Col xs={10}>
        <div className='account__title'>
          Rides
        </div>
        {ridesList}
        <div>
          <Link to='/rides/new'><Bootstrap.Button bsStyle='primary'>New ride</Bootstrap.Button></Link>
        </div>
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
    rides:          state.rides['rides'],
  };
}

export default connect(select)(RidesIndexPage);
