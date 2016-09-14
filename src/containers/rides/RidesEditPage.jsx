import React, { Component, PropTypes }  from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions/rides'
import RidesEditPageForm from '../../components/rides/RidesEditPageForm'

class RidesEditPage extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    ridesOptions: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchRidesOptions, fetchRide, params: { rideId } } = this.props
    fetchRidesOptions()
    if (rideId) {
      fetchRide(rideId)
    }
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

    updateRide(this.context.router, body, ride.id)
  }

  render() {
    const { ridesOptions, ride } = this.props
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit ride</div>
          </div>
          <RidesEditPageForm
            ridesOptions={ridesOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride,
    ridesOptions: state.ridesOptions
  }
}

const mapDispatchToProps = {
  fetchRidesOptions: actions.fetchRidesOptions,
  fetchRide: actions.fetchRide,
  updateRide: actions.updateRide
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesEditPage)
