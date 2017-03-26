import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export default function requireAuth(ChildComponent) {
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) this.props.authFailed()
    }

    render() {
      return (
        <div>
         { this.props.isAuthenticated === true ? <ChildComponent { ...this.props } /> : null }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.session,
    isAuthenticated: state.session.isAuthenticated,
  })

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      authFailed: () => {
        let location = ownProps.location
        let redirect = encodeURIComponent(location.pathname + location.search)
        dispatch(push(`/login?next=${redirect}`))
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
