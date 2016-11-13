// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dimensions from 'react-dimensions'
import ActionCable from 'actioncable'

// actions
import { logout } from '../actions/session'
import { fetchNotifications, markNotificationAsSeen, userNotificationAdd } from '../actions/notifications'
import { fetchCurrentUser } from '../actions/users'

// styles
import styles from '../stylesheets/application'

// components
import { Header } from '../components/header/header/header'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class Application extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props
    markNotificationAsSeen(notificationId)
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
      logout,
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
          markAsSeen={this.markAsSeen.bind(this)}
          onLogout={text =>
            logout(this.context.router, currentUser)
          } />
        <div id='main' className='container'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.currentUser.isFetching,
    isLoggedIn: state.session.isLoggedIn,
    session: state.session,
    currentUser: state.currentUser,
    notifications: state.notifications
  }
}

const mapDispatchToProps = {
  logout,
  fetchCurrentUser,
  fetchNotifications,
  markNotificationAsSeen,
  userNotificationAdd
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(Application))
