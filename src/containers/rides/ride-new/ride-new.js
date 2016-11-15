// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Col } from 'react-bootstrap'

// actions
import { fetchRidesOptions, createRide } from '../../../actions/rides'

// components
import RideForm from '../../../components/rides/ride-form/ride-form'

export class RideNew extends Component {
  static propTypes = {
    ridesOptions: PropTypes.object.isRequired
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
  }

  render() {
    const { ridesOptions } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New ride</div>
          </div>
          <RideForm
            ridesOptions={ridesOptions}
            onSubmit={this.handleSubmit}
          />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ridesOptions: state.ridesOptions
  }
}

const mapDispatchToProps = {
  fetchRidesOptions,
  createRide,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNew)
