import React, { PropTypes, Component } from 'react'
import Router, { Link }     from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import AppNavDrawer from './AppNavDrawer'

export default class HeaderNew extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    containerWidth: PropTypes.number.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    })
  }

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    })
  }

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    })
  }

  handleLogout = (event, value) => {
    this.props.onLogout()
  }

  state = {
    navDrawerOpen: false,
  }

  render() {
    const { containerWidth, currentUser } = this.props;
    const title = 'Blabla clone'
    let docked = false
    let showMenuIconButton = true
    let { navDrawerOpen } = this.state

    if (containerWidth > 992) {
      docked = true
      navDrawerOpen = true
      showMenuIconButton = false
    }

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          style={{position: 'fixed'}}
          showMenuIconButton={showMenuIconButton} />
        <AppNavDrawer
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          currentUser={currentUser}
          onLogout={this.handleLogout} />
      </div>
    )
  }
}
