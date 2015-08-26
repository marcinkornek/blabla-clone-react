import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../../stylesheets/users/Users'
import CarsItem             from '../../../components/users/cars/CarsIndexPageItem'
import * as actions          from '../../../actions/cars';

export default class CarsIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, session, currentUserId } = this.props;
    dispatch(actions.fetchCars(currentUserId, session));
  }

  render() {
    const { cars } = this.props
    var carsList
    if (cars) {
      carsList = cars.map((car, i) =>
        <CarsItem car={car} key={i} />
      )
    } else {
      carsList = 'No cars'
    }

    return (
      <div className='cars'>
        <div className='account-title'>
          My cars
        </div>
        {carsList}
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
    session:       state.session,
    cars:          state.cars['cars'],
  };
}

export default connect(select)(CarsIndexPage);
