import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import Geosuggest             from 'react-geosuggest'
import DatePicker             from 'react-datepicker'
import moment                 from 'moment'

import styles                 from '../../stylesheets/rides/Rides'
import formsStyles            from '../../stylesheets/shared/Forms'
import datepickerStyles       from 'react-datepicker/dist/react-datepicker.css'

export default class RidesSearchItem extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      startDate: moment(this.props.query.date, "DD-MM-YYYY"),
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

  handleChange (date) {
    this.setState({
      startDate: date
    })
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

        <Geosuggest
          onSuggestSelect={this.onSuggestSelectStart.bind(this)} ref='start_city' initialValue={query.start_city}/>

        <Geosuggest
          onSuggestSelect={this.onSuggestSelectDestination.bind(this)} ref='destination_city' initialValue={query.destination_city}/>

        <DatePicker
          ref='date'
          selected={this.state.startDate}
          onChange={this.handleChange.bind(this)}
          dateFormat={'DD/MM/YYYY'}
          className='form-control form-datepicker'
          placeholderText='Date'
          minDate={moment()} />

        <ButtonInput type='submit' value='Search' className='form-search' />
      </form>
    )

  }

  handleSubmitForm(e) {
    e.preventDefault()
    var searchCities = {
      start_city:       this.refs.start_city.state.userInput,
      destination_city: this.refs.destination_city.state.userInput,
      date:             this.refs.date.refs.input.state.value
    }
    this.props.onAddClick(searchCities);
  }
}
