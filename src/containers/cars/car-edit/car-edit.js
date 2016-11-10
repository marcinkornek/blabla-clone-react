// utils
import React, { Component, PropTypes } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'underscore'

// actions
import { fetchCarsOptions, fetchCar, updateCar } from '../../../actions/cars'

// components
import CarForm from '../../../components/cars/car-form/car-form'
import LoadingItem from '../../../components/shared/loading-item/loading-item'

class CarEdit extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    carsOptions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchCar, fetchCarsOptions, params: { carId } } = this.props

    fetchCarsOptions()
    if (carId) fetchCar(carId)
  }

  handleSubmit(data) {
    const { updateCar } = this.props
    let body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    updateCar(body, data.id)
  }

  renderCarForm() {
    const { isFetching, carsOptions, car } = this.props

    if (!isFetching && carsOptions) {
      return(
        <CarForm
          onSubmit={this.handleSubmit.bind(this)}
          carsOptions={carsOptions}
          car={car}
        />
      )
    } else {
      return(<LoadingItem />)
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit car</div>
          </div>
          {this.renderCarForm()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car.item,
    isFetching: state.car.isFetching,
    carsOptions: state.carsOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  fetchCar,
  updateCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
