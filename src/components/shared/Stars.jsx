import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import Icon                  from 'react-fa'

import styles                from '../../stylesheets/shared/Shared'

export default class Stars extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.label}</Bootstrap.Tooltip>
    )

    var stars = []
    for (var i = 0; i < this.props.stars; i++) {
      stars.push(<Icon name='star' />);
    }

    return (
      <Bootstrap.OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='stars'>
          {stars}
        </div>
      </Bootstrap.OverlayTrigger>
    )
  }
}
