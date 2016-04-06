import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles                 from '../../stylesheets/rides/Rides'
import FormTooltip            from '../shared/FormTooltip'
import pluralize              from 'pluralize'

export default class RideOfferForm extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  isNotAuthor() {
    if (this.props.currentUserId != this.props.ride.driver.id) {
      return true
    }
  }

  render() {
    var places = []
    for (var i = 0; i < parseInt(this.props.ride.places, 10); i++) {
      places.push(<option key={i} value={i + 1}> {pluralize('place', i + 1, true)} </option>);
    }

    var rideOfferForm
    if (this.props.currentUserId && parseInt(this.props.ride.places, 10) > 0 && this.isNotAuthor()) {
      rideOfferForm =
        <div className='book-ride'>
          click to book place:
          <form className='book-ride-form' onSubmit={this.handleSubmitForm.bind(this)}>
            <Input type='select' name='book_places' ref='book_places' groupClassName='book-ride-form__select' standalone>
              {places}
            </Input>
            <ButtonInput type='submit' value='Book' groupClassName='book-ride-form__submit' standalone />
          </form>
        </div>
    } else {
      if (this.props.currentUserId && parseInt(this.props.ride.places, 10) > 0 && this.isNotAuthor()) {
          rideOfferForm =
            <div className='book-ride'>
              No places
            </div>
        }
    }

    return(
      <div>
        {rideOfferForm}
      </div>
    )
  }

  handleSubmitForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.refs.book_places.getValue())
  }
}

RideOfferForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
