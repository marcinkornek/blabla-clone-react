import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
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

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.params.carId !== this.props.params.carId) {
      dispatch(actions.fetchCar(nextProps.params.carId))
    }
  }

  render() {
    const { dispatch, car, carsOptions, session, isSaving, userCars } = this.props;

    return (
      <div className='show-grid'>
        <UserAccountMenu userCars={userCars} />
        <Bootstrap.Col xs={10}>
          <CarsEditPageForm
            car={car} isSaving={isSaving}
            carsOptions={carsOptions}
            onAddClick={(car, car_photo) =>
              dispatch(actions.updateCar(car, car_photo, session))
            } />
        </Bootstrap.Col>
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
    userCars:      state.user.user.cars,
    car:           state.car.car,
    carsOptions:   state.carsOptions.carsOptions,
    session:       state.session.user
  };
}

export default connect(select)(CarsEditPage);
