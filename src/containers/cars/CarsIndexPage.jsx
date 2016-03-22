import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import { Button, Col }       from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsItem              from '../../components/cars/CarsIndexPageItem'
import UserAccountMenu       from '../../components/shared/UsersAccountMenu'

export default class CarsIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchCars(currentUserId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchCars(nextProps.currentUserId))
    }
  }

  render() {
    const { isFetching, cars, currentUserId } = this.props

    var carsList
    if (isFetching || currentUserId === undefined) {
      carsList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      if (_.isEmpty(cars)) {
        carsList = 'No cars'
      } else {
        carsList = cars.map((car, i) =>
          <CarsItem car={car} currentUserId={currentUserId} key={i} />
        )
      }
    }

    var carsMain =
      <Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My cars</div>
          <div className='account__heading-button'>
            <Link to='/cars/new'><Button bsStyle='primary' bsSize='small'>New car</Button></Link>
          </div>
        </div>
        {carsList}
      </Col>

    return (
      <div className='show-grid'>
        <div className='cars'>
          <UserAccountMenu />
          {carsMain}
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
    isFetching:    state.cars.isFetching,
    cars:          state.cars.cars,
    currentUserId: state.session.user.id
  };
}

export default connect(select)(CarsIndexPage);
