// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'

// actions
import { fetchCar } from '../../actions/cars';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { Stars } from '../../../components/shared/stars/stars'
import { CarActions } from '../../components/car-actions/car-actions'

class CarShow extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  static defaultProps = {
    car: {}
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
      return(<CarActions carId={car.id} />)
    }
  }

  renderCarDetails() {
    const { car } = this.props

    return(
      <div className='car-details'>
        <div className='car-details__name'>{car.full_name}</div>
        <div className='car-details__places'>{car.places_full}</div>
        <Stars stars={car.comfort_stars} label={car.comfort} />
        <div className='car-details__year'>{car.production_year}</div>
        <div className='car-details__color'>{car.color}</div>
        <div className='car-details__category'>{car.category}</div>
        {this.renderCarsActions()}
      </div>
    )
  }

  render() {
    const { isFetching, isStarted } = this.props

    return (
      <Grid className='car'>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderCarPhoto()}
          {this.renderCarDetails()}
        </AsyncContent>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car.item,
    isStarted: state.car.isStarted,
    isFetching: state.car.isFetching,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
