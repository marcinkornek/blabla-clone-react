import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import { Col }               from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class UsersAccountMenu extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    var carsEditLinks
    if (_.isEmpty(this.props.userCars)) {
      carsEditLinks = null
    } else {
      carsEditLinks = this.props.userCars.map((car, i) =>
        <div>
          <Link to={`/account/cars/${car.id}/edit`} key="car-#{i}" className='account-menu__subitem'>{car.full_name}</Link>
        </div>
      )
    }

    return (
      <Col xs={2} className='account-menu'>
        <div className='account-menu__heading'>
          Your profile
        </div>
        <Link to='/account/user' className='account-menu__item'>Profile</Link>
        <Link to='/account/cars' className='account-menu__item'>Cars</Link>
        {carsEditLinks}
        <Link to='/account/rides_as_driver' className='account-menu__item'>Rides as driver</Link>
        <Link to='/account/rides_as_passenger' className='account-menu__item'>Rides as passenger</Link>
      </Col>
    )
  }
}



