// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

// actions
import { fetchRidesOptions, fetchRide, updateRide } from '../../../actions/rides'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import RideForm from '../../../components/rides/ride-form/ride-form'

export class RideEdit extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ridesOptions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchRidesOptions, fetchRide, params: { rideId } } = this.props

    fetchRidesOptions()
    if (rideId) fetchRide(rideId)
  }

  handleSubmit(data) {
    const { updateRide, ride } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'destination_city' || key == 'start_city') {
        body.append(key, data[key].label)
        if (data[key].location) {
          body.append(key + '_lat', data[key].location.lat)
          body.append(key + '_lng', data[key].location.lng)
        }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    updateRide(body, ride.id)
  }

  renderRideForm() {
    const { ride, ridesOptions } = this.props

    return (
      <RideForm
        ridesOptions={ridesOptions}
        ride={ride}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit ride</div>
          </div>
          <AsyncContent
            isFetching={isFetching || !isStarted}
          >
            {this.renderRideForm()}
          </AsyncContent>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    ridesOptions: state.ridesOptions,
  }
}

const mapDispatchToProps = {
  fetchRidesOptions,
  fetchRide,
  updateRide,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideEdit)
