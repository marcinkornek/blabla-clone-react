import React, { PropTypes }  from 'react';
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesNewPageForm       from '../../components/rides/RidesNewPageForm'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class RidesNewPage extends React.Component {
  componentDidMount() {
    const { dispatch, session } = this.props
    if (session) {
      dispatch(actions.fetchRidesOptions(session))
    }
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'destination_city' || key == 'start_city') {
        body.append(key, data[key].label)
        body.append(key + '_lat', data[key].location.lat)
        body.append(key + '_lng', data[key].location.lng)
      } else {
        body.append(key, data[key])
      }
    });

    this.props.dispatch(actions.createRide(body, this.props.session))
  }

  render() {
    const { dispatch, session, ridesOptions } = this.props
    return (
      <div className='show-grid'>
        <UserAccountMenu/>
        <Col xs={10}>
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

function select(state) {
  return {
    session:      state.session.user,
    ridesOptions: state.ridesOptions.ridesOptions
  };
}

export default connect(select)(RidesNewPage);
