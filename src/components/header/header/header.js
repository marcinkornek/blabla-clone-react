// utils
import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/AppBar'

// components
import AppNavDrawer from '../../app-nav-drawer'
import HeaderRight from '../header-right/header-right'

export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    containerWidth: PropTypes.number.isRequired,
    onLogout: PropTypes.func.isRequired,
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
    const { containerWidth, currentUser, isLoggedIn, isFetching } = this.props
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
          showMenuIconButton={showMenuIconButton}
          iconElementRight={<HeaderRight {...this.props} />}
        />
        <AppNavDrawer
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          isFetching={isFetching}
          onLogout={this.handleLogout}
        />
      </div>
    )
  }
}
