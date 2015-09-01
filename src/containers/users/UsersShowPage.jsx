import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import CarsItem              from '../../components/cars/CarsIndexPageItem'
import RidesItem             from '../../components/rides/RidesIndexSimplePageItem'

export default class UsersShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var userId = this.props.params.userId
    const { dispatch } = this.props;
    dispatch(actions.fetchUser(userId));
  }

  render() {
    const { isFetching, user, currentUserId } = this.props

    var ridesList
    if (user.rides_as_driver) {
      ridesList = user.rides_as_driver.map((ride, i) =>
        <RidesItem ride={ride} key={i} />
      )
    } else {
      ridesList = 'No rides'
    }

    var userRidesAsDriver =
      <div className='user-show'>
        <div className='user-show__heading--activity'>
          Rides as driver
        </div>
        {ridesList}
      </div>

    var userActivity =
      <div className='user-show'>
        <div className='user-show__heading--activity'>
          Activity
        </div>
        <div className='user-show__details'>
          <Icon name='clock-o' className='user-show__details-icon'/>
          <div className='user-show__details-label'>Last visit</div>
          <div className='user-show__details-value'><Timestamp value={user.last_visit} format="DD MMM YYYY" /></div>
        </div>
        <div className='user-show__details'>
          <Icon name='calendar-times-o' className='user-show__details-icon'/>
          <div className='user-show__details-label'>Joined</div>
          <div className='user-show__details-value'><Timestamp value={user.created_at} format="DD MMM YYYY" /></div>
        </div>
      </div>

    var carsList
    if (user.cars) {
      carsList = user.cars.map((car, i) =>
        <CarsItem car={car} currentUserId={currentUserId} key={i} />
      )
    } else {
      carsList = 'No cars'
    }

    var userCar =
      <div className='user-show'>
        <div className='user-show__heading--car'>
          Cars
        </div>
        <div className='user-show__details-car'>
          {carsList}
        </div>
      </div>

    if (user.age) {
      var age =
      <div className='main-info__details-age'>({user.age} years)</div>
    }

    var userInfo =
      <div className='user-show'>
        <div className='user-show__heading--info'>
          User
        </div>
        <div className='user-show__details-avatar'>
          <img src={user.avatar}/>
        </div>
        <div className='user-show__details-info'>
          <div className='user-show__details-name'>{user.full_name}</div>
          <div className='user-show__details-age'>{age}</div>
          <div className='user-show__details-email'>{user.email}</div>
        </div>
      </div>

    return (
      <div className='show-grid'>
        <Bootstrap.Col xs={8}>
          {userInfo}
          {userRidesAsDriver}
        </Bootstrap.Col>
        <Bootstrap.Col xs={4}>
          {userActivity}
          {userCar}
        </Bootstrap.Col>
      </div>
    )
  }
}

UsersShowPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  console.log('state', state.user['user'])
  return {
    isFetching:    state.user['isFetching'],
    user:          state.user['user'],
    currentUserId: state.session.user.id
  };
}

export default connect(select)(UsersShowPage);
