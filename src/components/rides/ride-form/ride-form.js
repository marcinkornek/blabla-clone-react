// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

// form validators
import { RideValidator } from '../ride-validator/ride-validator'

// components
import DatePicker from '../../inputs/DatePicker'
import { renderTextField } from '../../shared/render-text-field/render-text-field'
import { renderGeoTextField } from '../../shared/render-geo-text-field/render-geo-text-field'
import { renderSelectField } from '../../shared/render-select-field/render-select-field'

class RideForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    ridesOptions: PropTypes.object.isRequired,
    ride: PropTypes.object
  }

  render() {
    const { handleSubmit, ridesOptions } = this.props

    var currencies = []
    var cars = []
    if (ridesOptions) {
      for (var i = 0; i < ridesOptions.currencies.length; i++) {
        currencies.push(<MenuItem value={ridesOptions.currencies[i]} key={'option-' + i} primaryText={ridesOptions.currencies[i]}/>)
      }
      for (var i = 0; i < ridesOptions.cars.length; i++) {
        cars.push(<MenuItem value={ridesOptions.cars[i].id} key={'car-' + i} primaryText={ridesOptions.cars[i].name}/>)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field name="start_city" type="text" component={renderGeoTextField} label="Start city"/>
        <Field name="destination_city" type="text" component={renderGeoTextField} label="Destination name"/>
        <Field name="start_date"
          component={DatePicker}
          floatingLabelText="Start date"
          className='date-input'
          minDate={new Date()} />
        <Field name="car_id" component={renderSelectField} label="Car">
          {_.map(cars, (n) => n)}
        </Field>
        <Field name="places" type="text" component={renderTextField} label="Seats"/>
        <Field name="price" type="text" component={renderTextField} label="Price"/>
        <Field name="currency" component={renderSelectField} label="Currency">
          {_.map(currencies, (n) => n)}
        </Field>
        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    )
  }
}

RideForm = reduxForm({
  form: 'RideForm',
  validate: RideValidator,
})(RideForm)

RideForm = connect(
  (state, props) => ({
    initialValues: props.ride
  })
)(RideForm)

export default RideForm
