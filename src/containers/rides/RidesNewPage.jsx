import React, { Component, PropTypes }  from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions/rides'
import styles from '../../stylesheets/rides/Rides'
import RidesNewPageForm from '../../components/rides/RidesNewPageForm'

class RidesNewPage extends Component {
  static propTypes = {
    ridesOptions: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchRidesOptions } = this.props
    fetchRidesOptions()
  }

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

    createRide(this.context.router, body)
  }

  render() {
    const { ridesOptions } = this.props
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New ride</div>
          </div>
          <RidesNewPageForm
            ridesOptions={ridesOptions}
            onSubmit={this.handleSubmit.bind(this)} />
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
  fetchRidesOptions: actions.fetchRidesOptions,
  createRide: actions.createRide,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesNewPage)
