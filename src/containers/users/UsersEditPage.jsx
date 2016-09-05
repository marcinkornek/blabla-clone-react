import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../../actions/users'
import styles from '../../stylesheets/users/Users'
import UsersEditPageForm from '../../components/users/UsersEditPageForm'
import LoadingItem from '../../components/shared/LoadingItem'

class UsersEditPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { fetchUserProfile, currentUserId } = this.props
    if (currentUserId) {
      fetchUserProfile(currentUserId)
    }
  }

  handleSubmit(data) {
    const { updateUser } = this.props

    var body = new FormData()
    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })

    updateUser(body)
  }

  render() {
    const { isFetching, currentUserId } = this.props
    var userEdit, userEditForm

    if (isFetching || currentUserId === undefined) {
      userEditForm =
        <LoadingItem />
    } else {
      userEditForm =
        <div>
          <UsersEditPageForm onSubmit={this.handleSubmit.bind(this)} />
        </div>
    }

    userEdit =
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My profile</div>
        </div>
        {userEditForm}
      </Col>

    return (
      <div className='show-grid'>
        {userEdit}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.user.isFetching,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchUserProfile: actions.fetchUserProfile,
  updateUser: actions.updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersEditPage)
