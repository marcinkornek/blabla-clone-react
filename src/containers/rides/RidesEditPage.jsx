import React, { Component, PropTypes }  from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions/rides'
import RidesEditPageForm from '../../components/rides/RidesEditPageForm'
import LoadingItem from '../../components/shared/LoadingItem'

class RidesEditPage extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
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

  renderRideEditForm() {
    const { isFetching, ridesOptions } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else {
      return(
        <RidesEditPageForm
          ridesOptions={ridesOptions}
          onSubmit={this.handleSubmit.bind(this)}
        />
      )
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit ride</div>
          </div>
          {this.renderRideEditForm()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ridesOptions: state.ridesOptions,
    isFetching: state.ride.isFetching
  }
}

const mapDispatchToProps = {
  fetchRidesOptions: actions.fetchRidesOptions,
  fetchRide: actions.fetchRide,
  updateRide: actions.updateRide
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesEditPage)
