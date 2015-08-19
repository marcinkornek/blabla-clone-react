import React, { PropTypes } from 'react'
import Header               from './Header'

export default class Application extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div>
        <Header />
        <div id='main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
