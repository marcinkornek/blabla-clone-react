import React, { Component, PropTypes } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../../actions/cars'
import CarNewForm from '../../../components/cars/car-new-form/car-new-form'

class CarNew extends Component {
  static propTypes = {
    carsOptions: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchCarsOptions } = this.props

    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { createCar } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    })
    createCar(this.context.router, body)
  }

  render() {
    const { carsOptions } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>New car</div>
          </div>
          <CarNewForm
            carsOptions={carsOptions}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    carsOptions: state.carsOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions: actions.fetchCarsOptions,
  createCar: actions.createCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarNew)
