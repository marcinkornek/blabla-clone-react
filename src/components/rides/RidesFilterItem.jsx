import React, { PropTypes }  from 'react'
import { reduxForm }         from 'redux-form'

import styles                from '../../stylesheets/rides/Rides'

export default class RidesFilterItem extends React.Component {
  render() {
    const {fields: {hide_full}, handleSubmit, submitting, filters} = this.props;
    return (
      <form onSubmit={handleSubmit} className='cities-filter-form'>
        <label>
          <input type="checkbox" {...hide_full} checked={hide_full.value}/>
          hide rides without empty places ({filters.full_rides})
        </label>
        <button type="submit" className="btn btn-default" disabled={submitting}>
          {submitting ? <i/> : <i/>} Filter
        </button>
      </form>
    )
  }
}

RidesFilterItem.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

RidesFilterItem = reduxForm({
  form: 'RidesFilterItem',
  fields: ['hide_full'],
},
  state => ({ initialValues: state.ridesSearch.data }),
)(RidesFilterItem);

export default RidesFilterItem;
