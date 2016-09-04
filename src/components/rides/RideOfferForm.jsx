import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderSelectField } from '../shared/RenderSelectField'
import MenuItem from 'material-ui/MenuItem'
import pluralize from 'pluralize'

class RideOfferForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  isNotAuthor() {
    const { currentUserId, ride } = this.props
    if (currentUserId != ride.driver.id) {
      return true
    }
  }

  render() {
    const { handleSubmit, currentUserId, ride } = this.props
    var places = []
    for (var i = 0; i < parseInt(ride.places, 10); i++) {
      places.push(<MenuItem key={i} value={i + 1} primaryText={pluralize('place', i + 1, true)} />)
    }

    var rideOfferForm
    if (currentUserId && parseInt(ride.places, 10) > 0 && this.isNotAuthor()) {
      rideOfferForm =
        <div className='book-ride'>
          <form className='book-ride-form' onSubmit={handleSubmit}>
            <Field name="places" component={renderSelectField} label="Click to book place:">
              {_.map(places, (n) => n)}
            </Field>

            <button type="submit" className="btn btn-default form-submit">Submit</button>
          </form>
        </div>
    } else {
      if (this.props.currentUserId && parseInt(ride.places, 10) > 0 && this.isNotAuthor()) {
          rideOfferForm =
            <div className='book-ride'>
              No places
            </div>
        }
    }

    return(
      <div>
        {rideOfferForm}
      </div>
    )
  }
}

export default reduxForm({
  form: 'RideOfferForm'
})(RideOfferForm)
