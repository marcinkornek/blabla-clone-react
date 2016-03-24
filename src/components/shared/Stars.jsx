import React, { PropTypes }        from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Icon                        from 'react-fa'
import styles                      from '../../stylesheets/shared/Shared'

export default class Stars extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

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
