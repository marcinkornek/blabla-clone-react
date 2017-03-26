import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderGeoTextField } from '../../shared/render-geo-text-field/render-geo-text-field'
import DatePicker from '../../inputs/DatePicker'

export class RideSearch extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit} className='rides-search'>
        <Field name="start_location" type="text" component={renderGeoTextField} label="Start city"/>
        <Field name="destination_location" type="text" component={renderGeoTextField} label="Destination city"/>
        <Field name="start_date"
          component={DatePicker}
          floatingLabelText="Start date"
          className='date-input'
          defaultValue={null} // DatePicker requires an object, and redux-form defaults to ''
          minDate={new Date()} />
        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    )
  }
}

RideSearch = reduxForm({
  form: 'RideSearch'
})(RideSearch)

RideSearch = connect(
  state => ({
    initialValues: state.ridesSearch.data
  })
)(RideSearch);

export default RideSearch;
