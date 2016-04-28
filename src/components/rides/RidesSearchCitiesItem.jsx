import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import Geosuggest             from 'react-geosuggest'
import styles                 from '../../stylesheets/rides/Rides'
import FormTooltip            from '../shared/FormTooltip'

export default class RidesSearchCitiesItem extends React.Component {
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
    return (
      <form className='cities-search-form' onSubmit={this.handleSubmitForm.bind(this)}>

        Start city
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectStart.bind(this)} ref='start_city' />

        Destination city
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectDestination.bind(this)} ref='destination_city' />

        <ButtonInput type='submit' value='Edit' />
      </form>
    )

  }

  handleSubmitForm(e) {
    e.preventDefault()
    var searchCities = {
      start_city:           this.state.start.city,
      start_city_lat:       this.state.start.lat,
      start_city_lng:       this.state.start.lng,
      destination_city:     this.state.destination.city,
      destination_city_lat: this.state.destination.lat,
      destination_city_lng: this.state.destination.lng,
    }
    this.props.onAddClick(searchCities);
  }
}
