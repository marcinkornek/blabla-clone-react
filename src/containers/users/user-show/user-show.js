// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap'
import Time from 'react-time'
import Icon from 'react-fa'
import Avatar from 'material-ui/Avatar'

// actions
import { fetchUser } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'
import { RidesIndexSimpleItem } from '../../../components/rides/rides-index-simple-item/rides-index-simple-item'

export class UserShow extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
  }

  static defaultProps = {
    user: {}
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
          <CarsIndexItem
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
          <RidesIndexSimpleItem
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
    const { isStarted, isFetching } = this.props

    return (
      <div className='show-grid'>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          <Col xs={8}>
            {this.renderUserInfo()}
            {this.renderUserRidesAsDriver()}
          </Col>
          <Col xs={4}>
            {this.renderUserActivity()}
            {this.renderUserCar()}
          </Col>
        </AsyncContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.item,
    isStarted: state.user.isStarted,
    isFetching: state.user.isFetching,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
