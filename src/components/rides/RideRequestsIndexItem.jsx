import React, { Component, PropTypes } from 'react'
import { Input, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'

export default class RideRequestsIndexItem extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {ride_request: props.ride_request}
  }

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
  }

  handleChange(e) {
    var ride_request = _.cloneDeep(this.state.ride_request)
    ride_request[e.target.name] = e.target.value
    this.setState({ride_request: ride_request})
  }

  handleSubmitForm(e) {
    e.preventDefault()
    const { onAddClick } = this.props
    onAddClick(this.state.ride_request.status)
  }

  render() {
    const { ride_request } = this.props

    var rideRequestsButton =
      <form onSubmit={this.handleSubmitForm.bind(this)}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select" type='select' name='status' ref='status' value={this.state.ride_request.status} onChange={this.handleChange.bind(this)}>
            <option value='accepted'> accept </option>
            <option value='pending'> pending </option>
            <option value='rejected'> reject </option>
          </FormControl>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </form>

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
        <div className='ride-request__button'>
          {rideRequestsButton}
        </div>
      </div>
    )
  }
}
