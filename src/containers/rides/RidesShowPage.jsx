import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router'
import Timestamp from 'react-time'
import Icon from 'react-fa'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'
import * as actions from '../../actions/rides'
import * as rrActions from '../../actions/ride_requests'
import RidesActions from '../../components/rides/RidesActions'
import RideOfferForm from '../../components/rides/RideOfferForm'
import RideRequestsIndexItem from '../../components/rides/RideRequestsIndexItem'

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

  handleSubmitRideRequest(data) {
    const { changeRideRequest } = this.props
    changeRideRequest(ride_request.id, data.status)
  }

  renderRideDescription() {
    const { ride } = this.props
    return(
      <div className='ride-show-description'>
        <div className='ride-show-description__heading'>
          <div className='ride-show-description__start-city'>{ride.start_city}</div>
          <Icon name="long-arrow-right" className='ride-show-description__arrow'/>
          <div className='ride-show-description__destination-city'>{ride.destination_city}</div>
          <div className='ride-show-description__actions'>
            {this.renderRideActions()}
          </div>
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
            <Timestamp value={ride.start_date} format="dddd D MMMM YYYY" />
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Time</div>
          <div className='ride-show-description__details-value'>
            <Timestamp value={ride.start_date} format="H:mm" />
          </div>
        </div>
        {this.renderRideDescriptionCar()}
      </div>
    )
  }

  renderRideOffer() {
    const { ride } = this.props
    return(
      <div className='ride-show-offer'>
        <div className='ride-show-offer__heading'>
          Offer
        </div>
        <div className='ride-show-offer__details-price'>
          <div className='ride-show-offer__details-price-value'>{ride.price}</div>
          <div className='ride-show-offer__details-price-currency'>{ride.currency}</div>
          <div className='ride-show-offer__details-price-label'>for person</div>
        </div>
        <div className='ride-show-offer__details-places'>
          <div className='ride-show-offer__details-places-value'>{ride.free_places_count} / {ride.places} {pluralize('place', this.props.ride.free_places_count)} </div>
        </div>
        <div className='ride-show-offer__details-book'>
          <div className='ride-show-offer__details-book-info'>
            {this.renderRideFormOrStatus()}
          </div>
        </div>
      </div>
    )
  }

  renderRideFormOrStatus() {
    const { ride, currentUserId } = this.props
    if (ride.requested) {
      return(
        <div className='ride-request'>
          <div className='ride-request__status'>
            <div className={'ride-request__status--' + ride.user_ride_request.status}>{ride.user_ride_request.status}</div>
          </div>
          <div className='ride-request__info'>
            <div className='ride-request__places'>
              <div className='ride-request__places-value'>{ride.user_ride_request.places}</div>
              <div className='ride-request__places-label'>{pluralize('place', ride.user_ride_request.places)}</div>
            </div>
            <div className='ride-request__created'>
              <div>Requested: <TimeAgo date={ride.user_ride_request.created_at} /></div>
              {this.renderRideStatusTimestamp()}
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <RideOfferForm
          ride={ride}
          currentUserId={currentUserId}
          onSubmit={this.handleSubmit.bind(this)} />
      )
    }
  }

  renderRideStatusTimestamp() {
    const { ride } = this.props
    if (ride.requested && ride.user_ride_request.status != 'pending' ) {
       return(
        <div>
          <div className='ride-request__status-capitalized'>{ride.user_ride_request.status}:</div>
          <TimeAgo date={ride.user_ride_request.updated_at} />
        </div>
      )
    }
  }

  renderRideRequests() {
    const { ride } = this.props
    if (ride.ride_requests) {
      return(
        <div className='ride-show-requests'>
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
        </div>
      )
    }
  }

  renderRideRequestsList() {
    const { ride, changeRideRequest } = this.props
    if (ride.ride_requests && ride.ride_requests.items.length > 0) {
      return(
        ride.ride_requests.items.map((ride_request, i) =>
          <RideRequestsIndexItem
            ride_request={ride_request} key={i}
            onAddClick={(status) =>
              changeRideRequest(ride_request.id, status)} />
        )
      )
    }
  }

  renderRideActions() {
    const { ride, currentUserId } = this.props
    if (ride.driver) {
      return(
        <RidesActions
          rideId={ride.id}
          rideOwner={ride.driver.id}
          currentUserId={currentUserId} />
      )
    }
  }

  renderRideDriver() {
    const { ride, currentUserId } = this.props
    if (ride.driver && currentUserId != ride.driver.id) {
      return(
        <div className='ride-show-driver'>
          <div className='ride-show-driver__heading'>
            User
          </div>
          <Link to={`/users/${ride.driver.id}`}>
            <div>
              <div className='ride-show-driver__details-avatar'><img src={ride.driver.avatar} /></div>
              <div className='ride-show-driver__details-info'>
                <div className='ride-show-driver__details-name'>{ride.driver.full_name}</div>
                <div className='ride-show-driver__details-age'>({ride.driver.age} years)</div>
                <div className='ride-show-driver__details-join'>
                  <div className='ride-show-driver__details-join-label'>joined:</div>
                  <div className='ride-show-driver__details-join-value'>
                    <Timestamp value={ride.driver.created_at} format="D MMMM YYYY" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )
    }
  }

  renderRideDescriptionCar() {
    const { ride } = this.props
    if (ride.car) {
      return(
        <Link to={`/cars/${ride.car.id}`}>
          <div className='ride-show-description__details'>
            <div className='ride-show-description__details-label'>Car name</div>
            <div className='ride-show-description__details-value'>{ride.car.full_name}</div>
          </div>
          <div className='ride-show-description__details'>
            <div className='ride-show-description__details-label'>Car photo</div>
            <div className='ride-show-description__details-value'><img src={ride.car.car_photo} /></div>
          </div>
        </Link>
      )
    }
  }

  render() {
    const { currentUserId } = this.props

    return(
      <div className='show-grid'>
        <Col xs={8}>
          {this.renderRideDescription()}
        </Col>
        <Col xs={4}>
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
