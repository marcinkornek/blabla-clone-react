import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import { Checkbox }             from 'react-bootstrap'
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import pluralize             from 'pluralize'

import styles                from '../../stylesheets/rides/Rides'

export default class RidesFilterItem extends React.Component {
  render() {
    const { query, filters } = this.props;
    return (
      <form className='cities-filter-form'>
        <Checkbox checked readOnly name='hide_full' ref='hide_full'>
          hide rides without empty places ({filters.full_rides})
        </Checkbox>
      </form>
    )
  }
}
