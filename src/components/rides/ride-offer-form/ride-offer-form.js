import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderSelectField } from '../../shared/RenderSelectField'
import SelectField from '../../inputs/SelectField'
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

  renderRideOfferForm() {
    const { handleSubmit, currentUserId, ride } = this.props
    var places = []
    for (var i = 0; i < ride.places; i++) {
      places.push(<MenuItem key={i} value={i + 1} primaryText={pluralize('place', i + 1, true)} />)
    }
    if (currentUserId && ride.places > 0 && this.isNotAuthor()) {
      return(
        <div className='book-ride'>
          <form className='book-ride-form' onSubmit={handleSubmit}>
            <Field name="places" component={SelectField} hintText="Click to book seats">
              {_.map(places, (n) => n)}
            </Field>

            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      )
    } else if (currentUserId && ride.places > 0 && this.isNotAuthor()) {
      return(
        <div className='book-ride'>
          No places
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderRideOfferForm()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'RideOfferForm'
})(RideOfferForm)
