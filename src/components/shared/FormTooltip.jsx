import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'

export default class FormTooltip extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const tooltipRequired = (
      <Bootstrap.Tooltip>required</Bootstrap.Tooltip>
    )

    var label
    if (this.props.required === 'true') {
      label =
        <Bootstrap.OverlayTrigger placement='top' overlay={tooltipRequired} delayShow={300} delayHide={150}>
          <div className='account_form-label--required'>
            *
          </div>
        </Bootstrap.OverlayTrigger>
    }

    return (
      <div className='account_form-label'>
        {this.props.label}
        {label}
      </div>
    )
  }
}
