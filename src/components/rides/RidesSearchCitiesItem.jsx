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
    const { query } = this.props;
    return (
      <form className='cities-search-form' onSubmit={this.handleSubmitForm.bind(this)}>

        Start city
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectStart.bind(this)} ref='start_city' initialValue={query.start_city}/>

        Destination city
        <Geosuggest
          onSuggestSelect={this.onSuggestSelectDestination.bind(this)} ref='destination_city' initialValue={query.destination_city}/>

        <ButtonInput type='submit' value='Edit' />
      </form>
    )

  }

  handleSubmitForm(e) {
    e.preventDefault()
    var searchCities = {
      start_city:       this.refs.start_city.state.userInput,
      destination_city: this.refs.destination_city.state.userInput
    }
    this.props.onAddClick(searchCities);
  }
}
