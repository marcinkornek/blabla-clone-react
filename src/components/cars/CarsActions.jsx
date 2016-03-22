import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import _                     from 'lodash'
import Icon                  from 'react-fa'

export default class CarsActions extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const tooltipEdit = (
      <Tooltip id='tooltip-edit'>Edit</Tooltip>
    );

    const tooltipDelete = (
      <Tooltip id='tooltip-delete'>Delete</Tooltip>
    );

    return (
      <div className='car-actions'>
        <Link to={`/account/cars/${this.props.carId}/edit`}>
          <OverlayTrigger placement='top' overlay={tooltipEdit} delayShow={300} delayHide={150}>
            <Icon name='edit' />
          </OverlayTrigger>
        </Link>
        <OverlayTrigger placement='top' overlay={tooltipDelete} delayShow={300} delayHide={150}>
          <Icon name='trash' />
        </OverlayTrigger>
      </div>
    )
  }
}
