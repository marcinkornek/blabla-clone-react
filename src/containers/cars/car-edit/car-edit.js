// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Col } from 'react-bootstrap'

// actions
import { fetchCarsOptions, fetchCar, updateCar } from '../../../actions/cars'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import CarForm from '../../../components/cars/car-form/car-form'

export class CarEdit extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    carsOptions: PropTypes.object.isRequired,
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
    const { carsOptions, car } = this.props

    return (
      <CarForm
        onSubmit={this.handleSubmit.bind(this)}
        carsOptions={carsOptions}
        car={car}
      />
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit car</div>
          </div>
          <AsyncContent
            isFetching={isFetching || !isStarted}
          >
            {this.renderCarForm()}
          </AsyncContent>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car.item,
    isStarted: state.car.isStarted,
    isFetching: state.car.isFetching,
    carsOptions: state.carsOptions,
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  fetchCar,
  updateCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
