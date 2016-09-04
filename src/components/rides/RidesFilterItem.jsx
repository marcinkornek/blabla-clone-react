import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Checkbox from '../inputs/Checkbox'

class RidesFilterItem extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit, filters } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="hide_full" component={Checkbox} label={`Hide full rides (${filters.full_rides})`} labelPosition="right"/>
        </div>
        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    )
  }
}

RidesFilterItem = reduxForm({
  form: 'RidesFilterItem'
})(RidesFilterItem)

RidesFilterItem = connect(
  state => ({
    initialValues: state.ridesSearch.data
  })
)(RidesFilterItem)

export default RidesFilterItem
