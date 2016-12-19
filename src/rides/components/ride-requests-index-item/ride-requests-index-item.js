// utils
import React, { Component, PropTypes } from 'react'
import { autobind } from 'core-decorators'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'
import RaisedButton from 'material-ui/RaisedButton'

export class RideRequestsIndexItem extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      ride_request: props.ride_request
    }
  }

  static propTypes = {
    handleOnClick: PropTypes.func.isRequired,
  }

  @autobind
  handleAcceptClick () {
    const { ride_request, handleOnClick } = this.props

    handleOnClick(ride_request.id, 'accepted')
  }

  @autobind
  handleRejectClick () {
    const { ride_request, handleOnClick } = this.props

    handleOnClick(ride_request.id, 'rejected')
  }

  renderRideRequestsButtons() {
    const { ride_request } = this.props

    if (ride_request.status == 'pending') {
      return (
        <div className='ride-request__button'>
          <RaisedButton label="Accept" primary={true} onClick={this.handleAcceptClick} />
          <RaisedButton label="Reject" secondary={true} onClick={this.handleRejectClick} />
        </div>
      )
    }
  }

  render() {
    const { ride_request } = this.props

    return (
      <div className='ride-request'>
        <div className='ride-request__status'>
          <div className={'ride-request__status--' + ride_request.status}>{ride_request.status}</div>
        </div>
        <div className='ride-request__info'>
          <div className='ride-request__passenger'>{this.state.ride_request.passenger.full_name}</div>
          <div className='ride-request__places'>
            <div className='ride-request__places-value'>{this.state.ride_request.places}</div>
            <div className='ride-request__places-label'>{pluralize('place', this.state.ride_request.places)}</div>
          </div>
          <div className='ride-request__created'><TimeAgo date={this.state.ride_request.created_at} /></div>
        </div>
        {this.renderRideRequestsButtons()}
      </div>
    )
  }
}
