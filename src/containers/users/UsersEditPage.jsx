import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from '../../actions/users'
import UsersEditPageForm from '../../components/users/UsersEditPageForm'
import LoadingItem from '../../components/shared/LoadingItem'

class UsersEditPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  handleSubmit(data) {
    const { updateCurrentUser } = this.props
    var body = new FormData()

    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    updateCurrentUser(body)
  }

  renderUserEditForm() {
    const { isFetching } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else {
      return(<UsersEditPageForm onSubmit={this.handleSubmit.bind(this)} />)
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>My profile</div>
          </div>
          {this.renderUserEditForm()}
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.currentUser.isFetching,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchCurrentUser: actions.fetchCurrentUser,
  updateCurrentUser: actions.updateCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersEditPage)
