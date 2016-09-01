import React, { PropTypes }  from 'react';
import { Col }               from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsNewPageForm       from '../../components/cars/CarsNewPageForm'

export default class CarsNewPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchCarsOptions());
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    });

    this.props.dispatch(actions.createCar(this.context.router, body))
  }

  render() {
    const { dispatch, carsOptions } = this.props;
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New car</div>
          </div>
          <CarsNewPageForm
            carsOptions={carsOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

CarsNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

CarsNewPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    carsOptions: state.carsOptions.carsOptions
  };
}

export default connect(select)(CarsNewPage);
