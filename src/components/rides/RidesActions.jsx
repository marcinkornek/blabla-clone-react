import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/rides/Rides'
import _                     from 'lodash'
import Icon                  from 'react-fa'

export default class RidesActions extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const tooltipEdit = (
      <Bootstrap.Tooltip>Edit</Bootstrap.Tooltip>
    );

    const tooltipDelete = (
      <Bootstrap.Tooltip>Delete</Bootstrap.Tooltip>
    );

    return (
      <div className='car-actions'>
        <Link to={`/account/cars/${this.props.carId}/edit`}>
          <Bootstrap.OverlayTrigger placement='top' overlay={tooltipEdit} delayShow={300} delayHide={150}>
            <Icon name='edit' />
          </Bootstrap.OverlayTrigger>
        </Link>
        <Bootstrap.OverlayTrigger placement='top' overlay={tooltipDelete} delayShow={300} delayHide={150}>
          <Icon name='trash' />
        </Bootstrap.OverlayTrigger>
      </div>
    )
  }
}
