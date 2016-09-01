import React, { PropTypes }  from 'react';
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesEditPageForm       from '../../components/rides/RidesEditPageForm'

export default class RidesEditPage extends React.Component {
  componentDidMount() {
    var rideId = this.props.params.rideId
    const { dispatch } = this.props;
    dispatch(actions.fetchRidesOptions())
    if (rideId) {
      dispatch(actions.fetchRide(rideId))
    }
  }

  handleSubmit(data) {
    const { dispatch, ride } = this.props

    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'destination_city' || key == 'start_city') {
        body.append(key, data[key].label)
        if (data[key].location) {
          body.append(key + '_lat', data[key].location.lat)
          body.append(key + '_lng', data[key].location.lng)
        }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    });

    dispatch(actions.updateRide(this.context.router, body, ride.id))
  }

  render() {
    const { dispatch, ridesOptions, ride } = this.props
    return (
      <div className='show-grid'>
        <Col xs={10}>
          <RidesEditPageForm
            ridesOptions={ridesOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

RidesEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

RidesEditPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    ride:         state.ride.ride,
    ridesOptions: state.ridesOptions.ridesOptions
  };
}

export default connect(select)(RidesEditPage);
