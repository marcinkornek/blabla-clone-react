import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Icon from 'react-fa'

export default class RidesActions extends Component {
  render() {
    const { rideOwner, rideId, currentUserId } = this.props
    const tooltipEdit = (
      <Tooltip id='tooltip-edit'>Edit</Tooltip>
    )
    const tooltipDelete = (
      <Tooltip id='tooltip-delete'>Delete</Tooltip>
    )

    var ridesActions
    if (currentUserId === rideOwner) {
      ridesActions =
        <div className='ride-actions'>
          <Link to={`/account/rides_as_driver/${rideId}/edit`}>
            <OverlayTrigger placement='top' overlay={tooltipEdit} delayShow={300} delayHide={150}>
              <Icon name='edit' />
            </OverlayTrigger>
          </Link>
          <OverlayTrigger placement='top' overlay={tooltipDelete} delayShow={300} delayHide={150}>
            <Icon name='trash' />
          </OverlayTrigger>
        </div>
    }

    return (
      <div>
        {ridesActions}
      </div>
    )
  }
}
