import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  }
}

export default class RidesDriverIndexTabsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'past'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    const { handleChange } = this.props

    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Past" value="past" >
          blablabla
        </Tab>
        <Tab label="Future" value="future">
          aaaaaa
        </Tab>
      </Tabs>
    )
  }
}
