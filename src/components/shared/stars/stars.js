// utils
import React, { Component, PropTypes } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Icon from 'react-fa'

export class Stars extends Component {
  static propTypes = {
    stars: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }

  render() {
    const { stars, label } = this.props
    const tooltipComfort = <Tooltip id='tooltip-comfort'>{label}</Tooltip>
    let starsArray = new Array(stars).fill(undefined).map((star, i) =>
      <Icon name='star' key={i} />
    )

    return (
      <OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='stars'>
          {starsArray}
        </div>
      </OverlayTrigger>
    )
  }
}
