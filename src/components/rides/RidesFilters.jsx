import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Toggle from '../inputs/Toggle'

class RidesFilters extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit, filters } = this.props

    return (
      <form onSubmit={handleSubmit} className="rides-filters">
        <div>
          <Field name="hide_full" component={Toggle} label={`Hide full rides (${filters.full_rides})`} labelPosition="left"/>
        </div>
        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    )
  }
}

RidesFilters = reduxForm({
  form: 'RidesFilters'
})(RidesFilters)

RidesFilters = connect(
  state => ({
    initialValues: state.ridesSearch.data
  })
)(RidesFilters)

export default RidesFilters
