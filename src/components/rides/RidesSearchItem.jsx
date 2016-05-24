import React, { PropTypes }   from 'react'
import { reduxForm }          from 'redux-form'
import classNames             from 'classnames'
import Geosuggest             from 'react-geosuggest'
import DatePicker             from 'react-datepicker'
import moment                 from 'moment'

import styles                 from '../../stylesheets/rides/Rides'
import formsStyles            from '../../stylesheets/shared/Forms'
import datepickerStyles       from 'react-datepicker/dist/react-datepicker.css'

const GeoSuggestWrapper = ({ field, placeholder }) => (
  <Geosuggest inputClassName='form-control' placeholder={placeholder} onSuggestSelect={field.onChange} {...field}/>
);

export default class RidesSearchItem extends React.Component {
  render() {
    const {fields: {start_city, destination_city, start_date}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit} className='rides-search'>
        <div className='form-group'>
          <GeoSuggestWrapper field={start_city} placeholder="Start city"/>
        </div>

        <div className='form-group'>
          <GeoSuggestWrapper field={destination_city} placeholder="Destination city"/>
        </div>

        <div className='form-group'>
          <DatePicker
            {...start_date}
            dateFormat='YYYY/MM/DD'
            selected={start_date.value ? moment(start_date.value, 'YYYY/MM/DD') : null }
            className='form-control '
            placeholderText='Start date'
            minDate={moment()} />
        </div>

        <button type="submit" className="btn btn-default" disabled={submitting}>
          {submitting ? <i/> : <i/>} Submit
        </button>
      </form>
    )
  }
}

RidesSearchItem.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

RidesSearchItem = reduxForm({
  form: 'RidesSearchItem',
  fields: ['start_city', 'destination_city', 'start_date'],
},
  state => ({ initialValues: state.ridesSearch.data }),
)(RidesSearchItem);

export default RidesSearchItem;
