import React, { Component, PropTypes } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

export default class FormTooltip extends Component {
  render() {
    const { label, required } = this.props
    const tooltipRequired = (
      <Tooltip id='tooltip-required'>required</Tooltip>
    )

    var renderLabel
    if (required === 'true') {
      renderLabel =
        <OverlayTrigger placement='top' overlay={tooltipRequired} delayShow={300} delayHide={150}>
          <div className='account_form-label--required'>
            *
          </div>
        </OverlayTrigger>
    }

    return (
      <div className='account_form-label'>
        {label}
        {renderLabel}
      </div>
    )
  }
}
