import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router'
import Time from 'react-time'
import Icon from 'react-fa'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'
import * as actions from '../../actions/rides'
import * as rrActions from '../../actions/ride_requests'
import RidesActions from '../../components/rides/RidesActions'
import RideOfferForm from '../../components/rides/RideOfferForm'
import RideRequestsIndexItem from '../../components/rides/RideRequestsIndexItem'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import RenderUserAge from '../../components/shared/RenderUserAge'

const styles = {
  avatarStyle: {
    margin: 10
  }
}

class RidesShowPage extends Component {
  static PropTypes = {
    ride: PropTypes.object.isRequired,
    currentUserId: PropTypes.number
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
          <div className='ride-show-offer__details-places-value'>{ride.free_places_count} / {ride.places} {pluralize('seat', this.props.ride.free_places_count)} free </div>
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
          onSubmit={this.handleSubmit.bind(this)}
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
            <div className='ride-show-requests__details-places-value'>{ride.requested_places_count} / {ride.free_places_count} {pluralize('place', ride.requested_places_count)} </div>
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
    const { ride, changeRideRequest } = this.props

    if (ride.ride_requests && ride.ride_requests.items.length > 0) {
      return(
        ride.ride_requests.items.map((ride_request, i) =>
          <RideRequestsIndexItem
            key={i}
            ride_request={ride_request}
            handleOnClick={this.handleRideRequestChange.bind(this)}
          />
        )
      )
    }
  }

  renderRideActions() {
    const { ride, currentUserId } = this.props

    if (ride.driver) {
      return(
        <span className='ride-show-description__actions'>
          <RidesActions
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

    if (ride.driver && currentUserId != ride.driver.id) {
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

    if (ride.car) {
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
  }

  render() {
    const { currentUserId } = this.props

    return(
      <div className='show-grid'>
        <Col xs={12} sm={7} md={8}>
          {this.renderRideDescription()}
        </Col>
        <Col xs={12} sm={5} md={4}>
          {this.renderRideOffer()}
          {this.renderRideRequests()}
          {this.renderRideDriver()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchRide: actions.fetchRide,
  createRideRequest: rrActions.createRideRequest,
  changeRideRequest: rrActions.changeRideRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesShowPage)
