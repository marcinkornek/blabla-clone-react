import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderNew from '../components/HeaderNew'
import * as actions from '../actions/session'
import * as userActions from '../actions/users'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dimensions from 'react-dimensions'
import styles from '../stylesheets/application'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class Application extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { currentUser, fetchUserNotifications } = this.props
    if (currentUser.isLoggedIn) {
      fetchUserNotifications()
    }
  }

  render () {
    const { logout, currentUser, userNotifications, containerWidth, children } = this.props
    return (
      <div>
        <HeaderNew
          currentUser={currentUser}
          userNotifications={userNotifications}
          containerWidth={containerWidth}
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
    isLoggedIn: state.session.isLoggedIn,
    currentUser: state.session,
    userNotifications: state.userNotifications
  }
}

const mapDispatchToProps = {
  logout: actions.logout,
  fetchUserNotifications: userActions.fetchUserNotifications
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(Application))
