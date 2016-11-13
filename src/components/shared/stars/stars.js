// utils
import React, { Component, PropTypes } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Icon from 'react-fa'

export class Stars extends Component {
  render() {
    const tooltipComfort = (
      <Tooltip id='tooltip-comfort'>{this.props.label}</Tooltip>
    )

    var stars = []
    for (var i = 0; i < this.props.stars; i++) {
      stars.push(<Icon name='star' key={i} />);
    }

    return (
      <OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='stars'>
          {stars}
        </div>
      </OverlayTrigger>
    )
  }
}
