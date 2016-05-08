import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import { Col }               from 'react-bootstrap'
import { connect }           from 'react-redux';
import _                     from 'underscore';

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsEditPageForm      from '../../components/cars/CarsEditPageForm'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class CarsEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var carId = this.props.params.carId
    const { dispatch } = this.props;
    dispatch(actions.fetchCarsOptions());
    if (carId) {
      dispatch(actions.fetchCar(carId))
    }
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (data[key]) { body.append(key, data[key][0])}
      } else {
        body.append(key, data[key]);
      }
    });

    this.props.dispatch(actions.updateCar(body, this.props.session))
  }

  render() {
    const { dispatch, car, carsOptions, session, isSaving, userCars } = this.props;

    return (
      <div className='show-grid'>
        <UserAccountMenu userCars={userCars} />
        <Col xs={10}>
          <CarsEditPageForm
            isSaving={isSaving}
            carsOptions={carsOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

CarsEditPage.PropTypes = {
  car: PropTypes.array.isRequired
}

function select(state) {
  return {
    isSaving:      state.car.isSaving,
    currentUserId: state.session.user.id,
    userCars:      state.cars.cars,
    car:           state.car.car,
    carsOptions:   state.carsOptions.carsOptions,
    session:       state.session.user
  };
}

export default connect(select)(CarsEditPage);
