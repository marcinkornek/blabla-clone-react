import React, { PropTypes }  from 'react';
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import RidesNewPageForm       from '../../components/rides/RidesNewPageForm'

export default class RidesNewPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, session } = this.props
    if (session) {
      dispatch(actions.fetchRidesOptions(session))
    }
  }

  render() {
    const { dispatch, session, ridesOptions } = this.props
    return (
      <div className='show-grid'>
        <Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <RidesNewPageForm
            ridesOptions={ridesOptions}
            onAddClick={(ride) =>
              dispatch(actions.createRide(ride, session))
            } />
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
