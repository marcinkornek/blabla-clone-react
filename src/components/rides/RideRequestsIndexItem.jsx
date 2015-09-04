import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/ride-requests/RideRequests'
import FormTooltip           from '../shared/FormTooltip'
import pluralize             from 'pluralize'
import TimeAgo               from 'react-timeago'

export default class RideRequestsIndexItem extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className='ride-request'>
        <div className={'ride-request__status ride-request__status--' + this.props.ride_request.status}>{this.props.ride_request.status}</div>
        <div className='ride-request__passenger'>{this.props.ride_request.passenger.full_name}</div>
        <div className='ride-request__places'>
          <div className='ride-request__places-value'>{this.props.ride_request.places}</div>
          <div className='ride-request__places-label'>{pluralize('place', this.props.ride_request.places)}</div>
        </div>
        <div className='ride-request__created'><TimeAgo date={this.props.ride_request.created_at} /></div>
      </div>
    )
  }

  handleSubmitForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.refs.book_places.getValue())
  }
}

RideRequestsIndexItem.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
