import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../../stylesheets/users/Users'
import CarsItem              from '../../../components/users/cars/CarsIndexPageItem'
import * as actions          from '../../../actions/cars';

export default class CarsIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    dispatch(actions.fetchCars(currentUserId));
  }

  render() {
    const { cars, currentUserId } = this.props
    var carsList
    if (cars) {
      carsList = cars.map((car, i) =>
        <CarsItem car={car} currentUserId={currentUserId} key={i} />
      )
    } else {
      carsList = 'No cars'
    }

    return (
      <div className='cars'>
        <div className='account__title'>
          My cars
        </div>
        {carsList}
        <div>
          <Link to='/cars/new'><Bootstrap.Button bsStyle='primary'>New car</Bootstrap.Button></Link>
        </div>
      </div>
    )
  }
}

CarsIndexPage.PropTypes = {
  cars: PropTypes.array.isRequired
}

function select(state) {
  return {
    currentUserId: state.session.user.id,
    cars:          state.cars['cars'],
  };
}

export default connect(select)(CarsIndexPage);
