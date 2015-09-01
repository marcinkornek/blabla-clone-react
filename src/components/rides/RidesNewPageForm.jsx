import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import Geosuggest            from 'react-geosuggest'
import styles                from '../../stylesheets/rides/Rides'
import stylesGeosuggest      from '../../stylesheets/shared/Geosuggest'
import FormTooltip           from '../shared/FormTooltip'

export default class RidesNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      start: {
        city: undefined,
        lat: undefined,
        lng: undefined
      },
      destination: {
        city: undefined,
        lat: undefined,
        lng: undefined
      }
    }
  }

  onSuggestSelectStart(suggest) {
    this.setState({
      start: {
        city: suggest.label,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      }
    })
  }

  onSuggestSelectDestination(suggest) {
    this.setState({
      destination: {
        city: suggest.label,
        lat: suggest.location.lat,
        lng: suggest.location.lng
      }
    })
  }

  render() {
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
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectStart.bind(this)} ref='start_city' />

        <FormTooltip label='Destination city' required='true' />
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectDestination.bind(this)} ref='destination_city' />

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
      start_city:           this.state.start.city,
      start_city_lat:       this.state.start.lat,
      start_city_lng:       this.state.start.lng,
      destination_city:     this.state.destination.city,
      destination_city_lat: this.state.destination.lat,
      destination_city_lng: this.state.destination.lng,
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
