import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import { Col }               from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'
import _                     from 'lodash'

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import UsersEditPageForm     from '../../components/users/UsersEditPageForm'

export default class UsersEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchUserProfile(currentUserId))
    }
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      console.log(key, data[key]);
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    })

    this.props.dispatch(actions.updateUser(body))
  }

  render() {
    const { isFetching, currentUserId } = this.props;
    var userEdit, userEditForm

    if (isFetching || currentUserId === undefined) {
      userEditForm =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      userEditForm =
        <div>
          <UsersEditPageForm onSubmit={this.handleSubmit.bind(this)} />
        </div>
    }

    userEdit =
      <Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My profile</div>
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

UsersEditPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.user.isFetching,
    currentUserId: state.session.user.id
  };
}

export default connect(select)(UsersEditPage);
