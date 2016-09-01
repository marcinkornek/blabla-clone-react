import React, { PropTypes }   from 'react'
import { connect }            from 'react-redux'
import { reduxForm, Field }   from 'redux-form'
import { renderGeoTextField } from '../shared/RenderGeoTextField'
import DatePicker             from '../inputs/DatePicker'
import classNames             from 'classnames'

class RidesSearchItem extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="start_city" type="text" component={renderGeoTextField} label="Start city"/>
        <Field name="destination_city" type="text" component={renderGeoTextField} label="Destination city"/>
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

RidesSearchItem = reduxForm({
  form: 'RidesSearchItem'
})(RidesSearchItem)

RidesSearchItem = connect(
  state => ({
    initialValues: state.ridesSearch.data
  })
)(RidesSearchItem);

export default RidesSearchItem;
