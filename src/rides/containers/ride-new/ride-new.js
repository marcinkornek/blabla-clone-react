// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'

// actions
import { fetchRidesOptions, createRide } from '../../actions/rides'

// components
import RideForm from '../../components/ride-form/ride-form'

export class RideNew extends Component {
  static propTypes = {
    rideOptions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchRidesOptions } = this.props

    fetchRidesOptions()
  }

  @autobind
  handleSubmit(data) {
    const { createRide } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'destination_city' || key == 'start_city') {
        body.append(key, data[key].label)
        body.append(key + '_lat', data[key].location.lat)
        body.append(key + '_lng', data[key].location.lng)
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    createRide(body)
      .then((response) => {
        let rideId = response.payload.data.id
        browserHistory.push(`/rides/${rideId}`)
      })
  }

  render() {
    const { rideOptions } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New ride</div>
          </div>
          <RideForm
            rideOptions={rideOptions}
            onSubmit={this.handleSubmit}
          />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rideOptions: state.rideOptions
  }
}

const mapDispatchToProps = {
  fetchRidesOptions,
  createRide,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNew)
