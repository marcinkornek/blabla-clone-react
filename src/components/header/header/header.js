// utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

// components
import { AppNavDrawer } from '../../app-nav-drawer'
import { HeaderRight } from '../header-right/header-right'

export class Header extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    containerWidth: PropTypes.number.isRequired,
    onLogout: PropTypes.func.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
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
    this.context.router.push(value)
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
    const { containerWidth, currentUser, isAuthenticated, isStarted, isFetching } = this.props
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
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            {showMenuIconButton && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={this.handleTouchTapLeftIconButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <HeaderRight {...this.props} />
          </Toolbar>
        </AppBar>
        <AppNavDrawer
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          isStarted={isStarted}
          isFetching={isFetching}
          onLogout={this.handleLogout}
        />
      </div>
    )
  }
}
