import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap'
import Time from 'react-time'
import Icon from 'react-fa'
import * as actions from '../../../actions/users';
import CarsItem from '../../../components/cars/cars-index-item/cars-index-item'
import RidesItem from '../../../components/rides/rides-index-simple-item/rides-index-simple-item'
import Avatar from 'material-ui/Avatar'
import RenderUserAge from '../../../components/shared/render-user-age/render-user-age'

class UserShow extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { fetchUser, params: { userId } } = this.props

    fetchUser(userId)
  }

  renderUserInfo() {
    const { user } = this.props

    return(
      <div className='user-show'>
        <div className='user-show__heading--info'>
          User
        </div>
        <div className='user-show__details-avatar'>
          <img src={user.avatar}/>
        </div>
        <div className='user-show__details-info'>
          <div className='user-show__details-name'>{user.full_name}</div>
          <div className='user-show__details-age'><RenderUserAge user={user} /></div>
          <div className='user-show__details-email'>{user.email}</div>
        </div>
      </div>
    )
  }

  renderUserCar() {
    return(
      <div className='user-show'>
        <div className='user-show__heading--car'>
          Cars
        </div>
        <div className='user-show__details-car'>
          {this.renderCarsList()}
        </div>
      </div>
    )
  }

  renderCarsList() {
    const { user, currentUserId } = this.props

    if (user.cars) {
      return(
        user.cars.items.map((car, i) =>
          <CarsItem
            key={i}
            car={car}
            currentUserId={currentUserId}
          />
        )
      )
    } else {
      return('No cars')
    }
  }

  renderUserActivity() {
    const { user } = this.props

    return(
      <div className='user-show'>
        <div className='user-show__heading--activity'>
          Activity
        </div>
        <div className='user-show__details'>
          <Icon name='clock-o' className='user-show__details-icon'/>
          <div className='user-show__details-label'>Last visit</div>
          <div className='user-show__details-value'><Time value={user.last_seen_at || Date.now()} format="DD MMM YYYY - HH:mm" /></div>
        </div>
        <div className='user-show__details'>
          <Icon name='calendar-times-o' className='user-show__details-icon'/>
          <div className='user-show__details-label'>Joined</div>
          <div className='user-show__details-value'><Time value={user.created_at || Date.now()} format="DD MMM YYYY" /></div>
        </div>
      </div>
    )
  }

  renderUserRidesAsDriver() {
    return(
      <div className='user-show'>
        <div className='user-show__heading--activity'>
          Rides as driver
        </div>
        {this.renderRidesList()}
      </div>
    )
  }

  renderRidesList() {
    const { user } = this.props

    if (user.rides_as_driver) {
      return(
        user.rides_as_driver.items.map((ride, i) =>
          <RidesItem
            ride={ride}
            key={i}
          />
        )
      )
    } else {
      return('No rides')
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={8}>
          {this.renderUserInfo()}
          {this.renderUserRidesAsDriver()}
        </Col>
        <Col xs={4}>
          {this.renderUserActivity()}
          {this.renderUserCar()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching,
    user: state.user,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchUser: actions.fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
