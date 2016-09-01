import React, { PropTypes }  from 'react';
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesNewPageForm       from '../../components/rides/RidesNewPageForm'

export default class RidesNewPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.fetchRidesOptions())
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'destination_city' || key == 'start_city') {
        body.append(key, data[key].label)
        body.append(key + '_lat', data[key].location.lat)
        body.append(key + '_lng', data[key].location.lng)
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    });

    this.props.dispatch(actions.createRide(this.context.router, body))
  }

  render() {
    const { dispatch, ridesOptions } = this.props
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New ride</div>
          </div>
          <RidesNewPageForm
            ridesOptions={ridesOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

RidesNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

RidesNewPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    ridesOptions: state.ridesOptions.ridesOptions
  };
}

export default connect(select)(RidesNewPage);
