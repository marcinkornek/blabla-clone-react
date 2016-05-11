import React, { PropTypes }   from 'react'
import { reduxForm }          from 'redux-form'
import classNames             from 'classnames'
import Geosuggest             from 'react-geosuggest'
import RideValidator          from './RideValidator'
import styles                 from '../../stylesheets/rides/Rides'
import formsStyles            from '../../stylesheets/shared/Forms'
import stylesGeosuggest       from '../../stylesheets/shared/Geosuggest'
import DatePicker             from 'react-datepicker'
import moment                 from 'moment'

const GeoSuggestWrapper = ({ field, placeholder }) => (
  <Geosuggest inputClassName='form-control' placeholder={placeholder} onSuggestSelect={field.onChange} {...field}/>
);

export default class RidesNewPageForm extends React.Component {
  render() {
    const {fields: {start_city, destination_city, places, start_date, car_id, price, currency}, handleSubmit, submitting} = this.props;
    var currencies = [<option value='' key={'option'}> -- select currency -- </option>]
    var cars       = [<option value='' key={'car'}> -- select car -- </option>]
    if (this.props.ridesOptions) {
      for (var i = 0; i < this.props.ridesOptions.currencies.length; i++) {
        currencies.push(<option value={this.props.ridesOptions.currencies[i]} key={'option-' + i}> {this.props.ridesOptions.currencies[i]} </option>);
      }
      for (var i = 0; i < this.props.ridesOptions.cars.length; i++) {
        cars.push(<option value={this.props.ridesOptions.cars[i].id} key={'car-' + i}> {this.props.ridesOptions.cars[i].name} </option>);
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className={classNames('form-group', {'has-error': start_city.touched && start_city.error})}>
          <label className="control-label">Start city</label>
          <GeoSuggestWrapper field={start_city} placeholder="Start city"/>
          {start_city.touched && start_city.error && <div className="form-error">{start_city.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': destination_city.touched && destination_city.error})}>
          <label className="control-label">Destination city</label>
          <GeoSuggestWrapper field={destination_city} placeholder="Destination city"/>
          {destination_city.touched && destination_city.error && <div className="form-error">{destination_city.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': places.touched && places.error})}>
          <label className="control-label">Seats</label>
          <input type="text" placeholder="Seats" className="form-control" {...places}/>
          {places.touched && places.error && <div className="form-error">{places.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': start_date.touched && start_date.error})}>
          <label className="control-label">Start date</label>
          <DatePicker
            {...start_date}
            dateFormat='YYYY/MM/DD'
            selected={start_date.value ? moment(start_date.value) : null }
            className='form-control'
            placeholderText='Start date'
            minDate={moment()} />
          {start_date.touched && start_date.error && <div className="form-error">{start_date.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': car_id.touched && car_id.error})}>
          <label className="control-label">Color</label>
          <select className="form-control" {...car_id} value={car_id.value || ''}> />
            {_.map(cars, (n) => n)}
          </select>
          {car_id.touched && car_id.error && <div className="form-error">{car_id.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': price.touched && price.error})}>
          <label className="control-label">Price</label>
          <input type="text" placeholder="Price" className="form-control" {...price}/>
          {price.touched && price.error && <div className="form-error">{price.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': currency.touched && currency.error})}>
          <label className="control-label">Color</label>
          <select className="form-control" {...currency} value={currency.value || ''}> />
            {_.map(currencies, (n) => n)}
          </select>
          {currency.touched && currency.error && <div className="form-error">{currency.error}</div>}
        </div>

        <div>
          <button type="submit" className="btn btn-default" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

RidesNewPageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

RidesNewPageForm = reduxForm({
  form: 'RidesNewPageForm',
  fields: ['start_city', 'destination_city', 'places', 'start_date', 'car_id', 'price', 'currency'],
  validate: RideValidator
})(RidesNewPageForm);

export default RidesNewPageForm;
