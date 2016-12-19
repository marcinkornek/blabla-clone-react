// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import Time from 'react-time'
import Icon from 'react-fa'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'

// actions
import { fetchRide } from '../../actions/rides'
import { createRideRequest, changeRideRequest } from '../../actions/ride-requests'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'
import { RideRequestsIndexItem } from '../../components/ride-requests-index-item/ride-requests-index-item'
import { RideActions } from '../../components/ride-actions/ride-actions'
import RideOfferForm from '../../components/ride-offer-form/ride-offer-form'

const styles = {
  avatarStyle: {
    margin: 10
  }
}

@autobind
class RideShow extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  static defaultProps = {
    ride: {
      driver: {},
      car: {},
      user_ride_request: {},
    }
  }

  componentDidMount() {
    const { fetchRide, params: { rideId } } = this.props

    fetchRide(rideId)
  }

  handleSubmit(data) {
    const { createRideRequest, ride } = this.props

    createRideRequest(ride.id, data.places)
  }

  handleRideRequestChange(rideRequestId, status) {
    const { changeRideRequest } = this.props

    changeRideRequest(rideRequestId, status)
  }

  renderRideDescription() {
    const { ride } = this.props

    return(
      <Paper>
        <div className='ride-show-description__heading'>
          {ride.start_city}
          <Icon name="long-arrow-right" className='ride-show-description__arrow'/>
          {ride.destination_city}
          {this.renderRideActions()}
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Start city</div>
          <div className='ride-show-description__details-value'>{ride.start_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Destination city</div>
          <div className='ride-show-description__details-value'>{ride.destination_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Date</div>
          <div className='ride-show-description__details-value'>
            <Time value={ride.start_date || Date.now()} format="dddd D MMMM YYYY" />
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Time</div>
          <div className='ride-show-description__details-value'>
            <Time value={ride.start_date || Date.now()} format="H:mm" />
          </div>
        </div>
        {this.renderRideDescriptionCar()}
      </Paper>
    )
  }

  renderRideOffer() {
    const { ride } = this.props

    return(
      <Paper className='ride-show-offer'>
        <div className='ride-show-offer__heading'>
          Book seats
        </div>
        <div className='ride-show-offer__details-price'>
          <div className='ride-show-offer__details-price-value'>{ride.price}</div>
          <div className='ride-show-offer__details-price-currency'>{ride.currency}</div>
          <div className='ride-show-offer__details-price-label'>for person</div>
        </div>
        <div className='ride-show-offer__details-places'>
          <div className='ride-show-offer__details-places-value'>
            {ride.free_places_count} / {ride.places} {pluralize('seat', ride.free_places_count)} free
          </div>
        </div>
        <div className='ride-show-offer__details-book'>
          <div className='ride-show-offer__details-book-info'>
            {this.renderRideFormOrStatus()}
          </div>
        </div>
      </Paper>
    )
  }

  renderRideFormOrStatus() {
    const { ride, currentUserId } = this.props

    if (ride.requested) {
      return(
        <Paper className='ride-request'>
          <div className='ride-request__status'>
            <div className={'ride-request__status--' + ride.user_ride_request.status}>{ride.user_ride_request.status}</div>
          </div>
          <div className='ride-request__info'>
            <div className='ride-request__places'>
              <div className='ride-request__places-value'>{ride.user_ride_request.places}</div>
              <div className='ride-request__places-label'>{pluralize('place', ride.user_ride_request.places)}</div>
            </div>
            <div className='ride-request__created'>
              <div>Requested: <TimeAgo date={ride.user_ride_request.created_at || Date.now()} /></div>
              {this.renderRideStatusTime()}
            </div>
          </div>
        </Paper>
      )
    } else {
      return(
        <RideOfferForm
          ride={ride}
          currentUserId={currentUserId}
          onSubmit={this.handleSubmit}
        />
      )
    }
  }

  renderRideStatusTime() {
    const { ride } = this.props

    if (ride.requested && ride.user_ride_request.status != 'pending' ) {
       return(
        <div>
          <div className='ride-request__status-capitalized'>{ride.user_ride_request.status}:</div>
          <TimeAgo date={ride.user_ride_request.updated_at || Date.now()} />
        </div>
      )
    }
  }

  renderRideRequests() {
    const { ride } = this.props

    if (ride.ride_requests) {
      return(
        <Paper className='ride-show-requests'>
          <div className='ride-show-requests__heading'>
            Requests
          </div>
          <div className='ride-show-requests__details-places'>
            <div className='ride-show-requests__details-places-value'>
              {ride.requested_places_count} / {ride.free_places_count} {pluralize('place', ride.requested_places_count)}
            </div>
          </div>
          <div className='ride-show-requests__details-book'>
            <div className='ride-show-requests__details-book-info'>
              {this.renderRideRequestsList()}
            </div>
          </div>
        </Paper>
      )
    }
  }

  renderRideRequestsList() {
    const { ride } = this.props

    if (ride.ride_requests && ride.ride_requests.items.length > 0) {
      return(
        ride.ride_requests.items.map((ride_request, i) =>
          <RideRequestsIndexItem
            key={i}
            ride_request={ride_request}
            handleOnClick={this.handleRideRequestChange}
          />
        )
      )
    }
  }

  renderRideActions() {
    const { ride, currentUserId } = this.props

    if (ride.driver.id == currentUserId) {
      return (
        <span className='ride-show-description__actions'>
          <RideActions
            rideId={ride.id}
            rideOwner={ride.driver.id}
            currentUserId={currentUserId}
          />
        </span>
      )
    }
  }

  renderRideDriver() {
    const { ride, currentUserId } = this.props

    if (currentUserId != ride.driver.id) {
      return(
        <Paper className='ride-show-driver'>
          <div className='ride-show-driver__heading'>
            Driver
          </div>
          <Link to={`/users/${ride.driver.id}`}>
            <div>
              <Avatar src={ride.driver.avatar} style={styles.avatarStyle}/>
              <div className='ride-show-driver__details-info'>
                <div className='ride-show-driver__details-name'>{ride.driver.full_name}</div>
                <div className='ride-show-driver__details-age'><RenderUserAge user={ride.driver} /></div>
                <div className='ride-show-driver__details-join'>
                  <div className='ride-show-driver__details-join-label'>joined:</div>
                  <div className='ride-show-driver__details-join-value'>
                    <Time value={ride.driver.created_at || Date.now()} format="D MMMM YYYY" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Paper>
      )
    }
  }

  renderRideDescriptionCar() {
    const { ride } = this.props

    return(
      <Link to={`/cars/${ride.car.id}`}>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Car</div>
          <div className='ride-show-description__details-value'>
            <img src={ride.car.car_photo} />{ride.car.full_name}
          </div>
        </div>
      </Link>
    )
  }

  render() {
    const { isFetching, isStarted } = this.props

    return(
      <div className='show-grid'>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          <Col xs={12} sm={7} md={8}>
            {this.renderRideDescription()}
          </Col>
          <Col xs={12} sm={5} md={4}>
            {this.renderRideOffer()}
            {this.renderRideRequests()}
            {this.renderRideDriver()}
          </Col>
        </AsyncContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchRide,
  createRideRequest,
  changeRideRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
