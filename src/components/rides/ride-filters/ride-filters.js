// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import MenuItem from 'material-ui/MenuItem'

// components
import Toggle from '../../inputs/Toggle'
import { renderSelectField } from '../../shared/render-select-field/render-select-field'

const ORDER_TYPES = [
  { label: 'newest', value: 'newest' },
  { label: 'oldest', value: 'oldest' },
  { label: 'recently added', value: 'recently_added' },
  { label: 'cheapest', value: 'cheapest' },
  { label: 'expensive', value: 'expensive' },
]
const CURRENCY_TYPES = [
  { label: 'PLN', value: 'pln' },
  { label: 'EUR', value: 'eur' },
  { label: 'USD', value: 'usd' },
]

export class RideFilters extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    filters: PropTypes.object,
  }

  render() {
    const { handleSubmit, filters } = this.props

    const orders = ORDER_TYPES.map((item) =>
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.label}
      />
    )
    const orderPlaceholder =
      <MenuItem
        key="order-placeholder"
        value={null}
        primaryText="order"
      />
    const currencies = CURRENCY_TYPES.map((item) =>
      <MenuItem
        key={item.value}
        value={item.value}
        primaryText={item.label}
      />
    )
    const currencyPlaceholder =
      <MenuItem
        key="currency-placeholder"
        value={null}
        primaryText="currency"
      />

    return (
      <div className='rides-filters__button'>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          multiple={false}
        >
          <form onSubmit={handleSubmit} className="rides-filters">
            <Field
              name='show_full'
              label='Show full'
              component={Toggle}
            />
            <Field
              name='show_as_driver'
              label='Show my rides as driver'
              component={Toggle}
            />
            <Field
              name='show_requested'
              label='Show requested rides'
              component={Toggle}
            />
            <button type="submit" className="btn btn-default form-submit">Submit</button>
          </form>
        </IconMenu>
      </div>
    )
  }
}

RideFilters = reduxForm({
  form: 'RideFilters'
})(RideFilters)

RideFilters = connect(
  (state, props) => ({
    initialValues: props.filters
  })
)(RideFilters)

export default RideFilters
