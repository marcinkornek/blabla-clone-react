import React, { PropTypes }        from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import styles                      from '../../stylesheets/users/Users'

export default class FormTooltip extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const tooltipRequired = (
      <Tooltip id='tooltip-required'>required</Tooltip>
    )

    var label
    if (this.props.required === 'true') {
      label =
        <OverlayTrigger placement='top' overlay={tooltipRequired} delayShow={300} delayHide={150}>
          <div className='account_form-label--required'>
            *
          </div>
        </OverlayTrigger>
    }

    return (
      <div className='account_form-label'>
        {this.props.label}
        {label}
      </div>
    )
  }
}
