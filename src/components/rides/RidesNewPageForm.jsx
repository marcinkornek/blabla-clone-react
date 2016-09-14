import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from '../shared/RenderTextField'
import { renderGeoTextField } from '../shared/RenderGeoTextField'
import { renderSelectField } from '../shared/RenderSelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from '../inputs/DatePicker'
import RideValidator from './RideValidator'

class RidesNewPageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
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
          value={null} // DatePicker requires an object, and redux-form defaults to ''
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

export default reduxForm({
  form: 'RidesNewPageForm',
  validate: RideValidator,
})(RidesNewPageForm)
