import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

// actions
import { logout } from '../actions/session'
import { markNotificationAsSeen, userNotificationAdd } from '../actions/notifications'

// styles
import '../stylesheets/application.css'

// components
import { Header } from '../components/header/header/header'

const Application = ({
  currentUser,
  notifications,
  isAuthenticated,
  isStarted,
  isFetching,
  containerWidth,
  logout: logoutAction,
  markNotificationAsSeen: markAsSeenAction,
  userNotificationAdd: addNotificationAction
}) => {
  const markAsSeen = (notificationId) => {
    markAsSeenAction(notificationId)
  }

  const handleLogout = (currentUser) => {
    logoutAction(currentUser)
      .then(() => localStorage.clear())
      .then(() => window.location.href = '/')
  }

  useEffect(() => {
    if (isAuthenticated && window.cable) {
      window.cable.subscriptions.create("NotificationsChannel", {
        received(data) {
          addNotificationAction(data.notification)
        }
      })
    }
  }, [isAuthenticated, addNotificationAction])

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        isStarted={isStarted}
        isFetching={isFetching}
        currentUser={currentUser}
        notifications={notifications}
        containerWidth={containerWidth}
        markAsSeen={markAsSeen}
        onLogout={handleLogout}
      />
      <div id='main' className='container'>
        <Outlet />
      </div>
    </div>
  )
}

Application.propTypes = {
  session: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  isStarted: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  notifications: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.currentUser.item,
    isStarted: state.currentUser.isStarted,
    isFetching: state.currentUser.isFetching,
    notifications: state.notifications,
  }
}

const mapDispatchToProps = {
  logout,
  markNotificationAsSeen,
  userNotificationAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
