import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderSelectField }  from '../shared/RenderSelectField'
import MenuItem from 'material-ui/MenuItem'
import pluralize from 'pluralize'
import TimeAgo from 'react-timeago'
import styles from '../../stylesheets/ride-requests/RideRequests'

class RideRequestsIndexItem extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { ride_request, handleSubmit } = this.props

    var rideRequestsButton =
      <form onSubmit={handleSubmit}>
        <Field name="status" component={renderSelectField} label="Status">
          <MenuItem value="accepted" key="accepted" primaryText="accept" />
          <MenuItem value="pending" key="pending" primaryText="pending" />
          <MenuItem value="rejected" key="rejected" primaryText="reject" />
        </Field>
        <Field name="id" component="input" type="text" placeholder="First Name"/>
        <button type="submit" className="btn btn-default form-submit">Ok</button>
      </form>

    return (
      <div className='ride-request'>
        <div className='ride-request__status'>
          <div className={'ride-request__status--' + ride_request.status}>{ride_request.status}</div>
        </div>
        <div className='ride-request__info'>
          <div className='ride-request__passenger'>{ride_request.passenger.full_name}</div>
          <div className='ride-request__places'>
            <div className='ride-request__places-value'>{ride_request.places}</div>
            <div className='ride-request__places-label'>{pluralize('place', ride_request.places)}</div>
          </div>
          <div className='ride-request__created'><TimeAgo date={ride_request.created_at} /></div>
        </div>
        <div className='ride-request__button'>
          {rideRequestsButton}
        </div>
      </div>
    )
  }
}

RideRequestsIndexItem = reduxForm({
  form: 'RideRequestsIndexItem'
})(RideRequestsIndexItem)

// RideRequestsIndexItem = connect(
//   state => {
//     initialValues: state.car
//   }
// )(RideRequestsIndexItem)

export default RideRequestsIndexItem
