import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'

import styles                from '../../stylesheets/rides/Rides'
import FormTooltip           from '../shared/FormTooltip'

export default class RidesNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    console.log('this.props.ridesOptions', this.props.ridesOptions)
    var currencies = [<option value=''> -- select currency -- </option>]
    var cars       = [<option value=''> -- select car -- </option>]
    if (this.props.ridesOptions) {
      for (var i = 0; i < this.props.ridesOptions.currencies.length; i++) {
        currencies.push(<option value={this.props.ridesOptions.currencies[i]}> {this.props.ridesOptions.currencies[i]} </option>);
      }
      for (var i = 0; i < this.props.ridesOptions.cars.length; i++) {
        cars.push(<option value={this.props.ridesOptions.cars[i].id}> {this.props.ridesOptions.cars[i].name} </option>);
      }
    }


    return (
      <form className='login-email-form' onSubmit={this.handleSubmitRegisterForm.bind(this)}>

        <FormTooltip label='Start city' required='true' />
        <Bootstrap.Input type='text' placeholder='Start city' ref='start_city' />

        <FormTooltip label='Start city lat' required='true' />
        <Bootstrap.Input type='text' placeholder='Start city lat' ref='start_city_lat' />

        <FormTooltip label='Start city lng' required='true' />
        <Bootstrap.Input type='text' placeholder='Start city lng' ref='start_city_lng' />

        <FormTooltip label='Destination city' required='true' />
        <Bootstrap.Input type='text' placeholder='Destination city' ref='destination_city' />

        <FormTooltip label='Destination city lat' required='true' />
        <Bootstrap.Input type='text' placeholder='Destination city lat' ref='destination_city_lat' />

        <FormTooltip label='Destination city lng' required='true' />
        <Bootstrap.Input type='text' placeholder='Destination city lng' ref='destination_city_lng' />

        <FormTooltip label='Seats' required='true' />
        <Bootstrap.Input type='number' placeholder='Seats' ref='seats' />

        <FormTooltip label='Start date' required='true' />
        <Bootstrap.Input type='date' placeholder='Start date' ref='start_date' />

        <FormTooltip label='Car' required='true' />
        <Bootstrap.Input type='select' ref='car_id'>
          {cars}
        </Bootstrap.Input>

        <FormTooltip label='Price' required='true' />
        <Bootstrap.Input type='number' placeholder='Price' ref='price' />

        <FormTooltip label='Currency' required='true' />
        <Bootstrap.Input type='select' ref='currency'>
          {currencies}
        </Bootstrap.Input>

        <Bootstrap.ButtonInput type='submit' value='Create' />
      </form>
    )
  }

  handleSubmitRegisterForm(e) {
    e.preventDefault()
    var newRide = {
      start_city:           this.refs.start_city.getValue(),
      start_city_lat:       this.refs.start_city_lat.getValue(),
      start_city_lng:       this.refs.start_city_lng.getValue(),
      destination_city:     this.refs.destination_city.getValue(),
      destination_city_lat: this.refs.destination_city_lat.getValue(),
      destination_city_lng: this.refs.destination_city_lng.getValue(),
      seats:                this.refs.seats.getValue(),
      start_date:           this.refs.start_date.getValue(),
      car_id:               this.refs.car_id.getValue(),
      price:                this.refs.price.getValue(),
      currency:             this.refs.currency.getValue()
    }
    this.props.onAddClick(newRide);
  }
}

RidesNewPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
