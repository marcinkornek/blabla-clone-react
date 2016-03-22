import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles                 from '../../stylesheets/ride-requests/RideRequests'
import FormTooltip            from '../shared/FormTooltip'
import pluralize              from 'pluralize'
import TimeAgo                from 'react-timeago'

export default class RideRequestsIndexItem extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {ride_request: props.ride_request}
  }

  handleChange(e) {
    var ride_request = _.cloneDeep(this.state.ride_request)
    ride_request[e.target.name] = e.target.value
    this.setState({ride_request: ride_request})
  }

  render() {
    var rideRequestsButton =
      <form onSubmit={this.handleSubmitForm.bind(this)}>
        <Input type='select' name='status' ref='status' groupClassName='book-ride-form__select' value={this.state.ride_request.status} onChange={this.handleChange.bind(this)} standalone>
          <option value='accepted'> accept </option>
          <option value='pending'> pending </option>
          <option value='rejected'> reject </option>
        </Input>
        <ButtonInput type='submit' value='OK' groupClassName='book-ride-form__submit' standalone />
      </form>

    return (
      <div className='ride-request'>
        <div className='ride-request__status'>
          <div className={'ride-request__status--' + this.props.ride_request.status}>{this.props.ride_request.status}</div>
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

  handleSubmitForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.ride_request.status)
  }
}

RideRequestsIndexItem.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
