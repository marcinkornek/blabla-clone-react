import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'underscore'
import * as actions from '../../actions/cars'
import styles from '../../stylesheets/users/Users'
import CarsEditPageForm from '../../components/cars/CarsEditPageForm'

class CarsEditPage extends Component {
  static PropTypes = {
    currentUserId: PropTypes.number.isRequired,
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
    const { updateCar, car } = this.props
    var body = new FormData()
    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })

    actions.updateCar(this.context.router, body, car.id)
  }

  render() {
    const { carsOptions } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit car</div>
          </div>
          <CarsEditPageForm
            carsOptions={carsOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id,
    carsOptions: state.carsOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions: actions.fetchCarsOptions,
  fetchCar: actions.fetchCar,
  updateCar: actions.updateCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsEditPage)
