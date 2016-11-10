// utils
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Icon from 'react-fa'

const tooltipEdit = (
  <Tooltip id='tooltip-edit'>Edit</Tooltip>
)
const tooltipDelete = (
  <Tooltip id='tooltip-delete'>Delete</Tooltip>
)

export default class CarActions extends Component {
  render() {
    const { carId } = this.props
    return (
      <div className='car-actions'>
        <Link to={`/account/cars/${carId}/edit`}>
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
