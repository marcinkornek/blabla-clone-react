import React, { PropTypes }  from 'react';
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';

import CarsNewPageForm       from '../../../components/users/cars/CarsNewPageForm'
import styles                from '../../../stylesheets/users/Users'
import * as actions          from '../../../actions/cars';

export default class CarsNewPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchCarsOptions());
  }

  render() {
    const { dispatch, carsOptions, session } = this.props;
    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            <CarsNewPageForm
              carsOptions={carsOptions}
              onAddClick={(car, car_photo) =>
                dispatch(actions.createCar(car, car_photo, session))
              } />
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
}

CarsNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    session:     state.session.user,
    carsOptions: state.carsOptions.carsOptions
  };
}

export default connect(select)(CarsNewPage);
