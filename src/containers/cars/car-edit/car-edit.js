import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'underscore'
import * as actions from '../../../actions/cars'
import CarEditForm from '../../../components/cars/car-edit-form/car-edit-form'
import LoadingItem from '../../../components/shared/loading-item/loading-item'

class CarEdit extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    carsOptions: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchCar, fetchCarsOptions, params: { carId } } = this.props

    fetchCarsOptions()
    if (carId) {
      fetchCar(carId)
    }
  }

  handleSubmit(data) {
    const { updateCar } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    updateCar(this.context.router, body, data.id)
  }

  renderCarEditForm() {
    const { isFetching, carsOptions } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else {
      return(
        <CarEditForm
          onSubmit={this.handleSubmit.bind(this)}
          carsOptions={carsOptions}
        />
      )
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit car</div>
          </div>
          {this.renderCarEditForm()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.car.isFetching,
    carsOptions: state.carsOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions: actions.fetchCarsOptions,
  fetchCar: actions.fetchCar,
  updateCar: actions.updateCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
