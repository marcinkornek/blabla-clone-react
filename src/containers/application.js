// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dimensions from 'react-dimensions'
import ActionCable from 'actioncable'
import { browserHistory } from 'react-router'

// actions
import { logout } from '../actions/session'
import { markNotificationAsSeen, userNotificationAdd } from '../actions/notifications'

// styles
import styles from '../stylesheets/application'

// components
import { Header } from '../components/header/header/header'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class Application extends Component {
  static propTypes = {
    session: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    notifications: PropTypes.object,
  }

  @autobind
  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props
    markNotificationAsSeen(notificationId)
  }

  @autobind
  logout(currentUser) {
    const { logout } = this.props

    logout(currentUser)
      .then(localStorage.clear())
      .then(browserHistory.push('/'))
  }

  componentDidMount() {
    const { isLoggedIn, userNotificationAdd } = this.props

    if (isLoggedIn) {
      window.cable.subscriptions.create("NotificationsChannel", {
        received(data) {
          userNotificationAdd(data.notification)
        }
      })
    }
  }

  render () {
    const {
      currentUser,
      notifications,
      isLoggedIn,
      isFetching,
      containerWidth,
      children
    } = this.props

    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          isFetching={isFetching}
          currentUser={currentUser}
          notifications={notifications}
          containerWidth={containerWidth}
          markAsSeen={this.markAsSeen}
          onLogout={this.logout}
        />
        <div id='main' className='container'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    isLoggedIn: state.session.isLoggedIn,
    currentUser: state.currentUser,
    isFetching: state.currentUser.isFetching,
    notifications: state.notifications,
  }
}

const mapDispatchToProps = {
  logout,
  markNotificationAsSeen,
  userNotificationAdd
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(Application))
