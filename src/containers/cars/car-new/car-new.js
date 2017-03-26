// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import _ from 'lodash'

// actions
import { fetchCarsOptions, createCar, initializeCar } from '../../../actions/cars'

// components
import CarForm from '../../../components/cars/car-form/car-form'

export class CarNew extends Component {
  static propTypes = {
    carOptions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchCarsOptions, initializeCar } = this.props

    initializeCar()
    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { createCar } = this.props
    let body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key === 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    })
    createCar(body)
      .then((response) => {
        let carId = response.payload.data.id
        browserHistory.push(`/cars/${carId}`)
      })
  }

  renderCarForm() {
    const { carOptions } = this.props

    return(
      <CarForm
        onSubmit={this.handleSubmit.bind(this)}
        carOptions={carOptions}
      />
    )
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New car</div>
          </div>
          {this.renderCarForm()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    carOptions: state.carOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  createCar,
  initializeCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarNew)
