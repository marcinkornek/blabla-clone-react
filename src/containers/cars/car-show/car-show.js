import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'
import { Link } from 'react-router';
import Timestamp from 'react-time'
import Icon from 'react-fa'
import * as actions from '../../../actions/cars';
import CarsActions from '../../../components/cars/car-actions/car-actions'
import Stars from '../../../components/shared/Stars'

class CarShow extends Component {
  static PropTypes = {
    car: PropTypes.array.isRequired,
    currentUserId: PropTypes.number
  }

  componentDidMount() {
    const { fetchCar, params: { carId } } = this.props

    fetchCar(carId)
  }

  renderCarPhoto() {
    const { car } = this.props

    return(
      <div className='main-info__photo'>
        <img src={car.car_photo} />
      </div>
    )
  }

  renderCarsActions() {
    const { car, currentUserId } = this.props

    if (car.owner_id === currentUserId) {
      return(<CarsActions carId={this.props.car.id} />)
    }
  }

  renderCarDetails() {
    const { car } = this.props

    return(
      <div className='car-details'>
        <div className='car-details__name'>{car.full_name}</div>
        <div className='car-details__places'>{this.props.car.places_full}</div>
        <Stars stars={this.props.car.comfort_stars} label={this.props.car.comfort} />
        <div className='car-details__year'>{car.production_year}</div>
        <div className='car-details__color'>{car.color}</div>
        <div className='car-details__category'>{car.category}</div>
        {this.renderCarsActions()}
      </div>
    )
  }

  render() {
    return (
      <Grid className='car'>
        {this.renderCarPhoto()}
        {this.renderCarDetails()}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchCar: actions.fetchCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
