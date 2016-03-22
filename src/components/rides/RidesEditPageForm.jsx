import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import _                      from 'lodash'
import Icon                   from 'react-fa'
import Geosuggest             from 'react-geosuggest'
import FormTooltip            from '../shared/FormTooltip'
import styles                 from '../../stylesheets/users/Users'
import stylesGeosuggest       from '../../stylesheets/shared/Geosuggest'

export default class RidesEditPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this._handleSubmitEditRideForm = this.handleSubmitEditRideForm.bind(this)
    this.state = {
      ride: props.ride,
      start: {
        city: props.ride.start_city,
        lat:  props.ride.start_city_lat,
        lng:  props.ride.start_city_lng
      },
      destination: {
        city: props.ride.destination_city,
        lat:  props.ride.destination_city_lat,
        lng:  props.ride.destination_city_lng
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSaving === false) {
      this.setState({ride: nextProps.ride})
    }
  }

  handleChange(e) {
    var ride = _.cloneDeep(this.state.ride)
    ride[e.target.name] = e.target.value
    this.setState({ride: ride})
  }

  handleSubmitEditRideForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.ride, this.state.start, this.state.destination);
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
      <div>
        <div className='account__title'>
          Edit ride
        </div>
        <form className='-form' onSubmit={this._handleSubmitEditRideForm}>
          <FormTooltip label='Start city' required='true' />
          <Geosuggest
            onSuggestSelect={this.onSuggestSelectStart.bind(this)} ref='start_city' initialValue={this.state.start.city} />

          <FormTooltip label='Destination city' required='true' />
          <Geosuggest
            onSuggestSelect={this.onSuggestSelectDestination.bind(this)} ref='destination_city' initialValue={this.state.destination.city} />

          <FormTooltip label='Seats' required='true' />
          <Input type='text' name='places' placeholder='Seats' ref='places' value={this.state.ride.places} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Start date' required='true' />
          <Input type='text' name='start_date' placeholder='Start date' ref='start_date' value={this.state.ride.start_date} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Price' required='true' />
          <Input type='text' name='price' placeholder='Price' ref='price' value={this.state.ride.price} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Car' required='true' />
          <Input type='select' ref='car_id' value={this.state.ride.car.id} onChange={this.handleChange.bind(this)}>
            {cars}
          </Input>

          <FormTooltip label='Currency' required='true' />
          <Input type='select' ref='currency' value={this.state.ride.currency} onChange={this.handleChange.bind(this)}>
            {currencies}
          </Input>

          <ButtonInput type='submit' value='Edit' />
        </form>
      </div>
    )
  }
}

RidesEditPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
