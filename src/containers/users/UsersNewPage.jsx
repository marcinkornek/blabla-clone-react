import React, { PropTypes } from 'react';
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import Icon from 'react-fa'

import * as actions from '../../actions/users';
import styles from '../../stylesheets/users/Users'
import UsersNewPageForm from '../../components/users/UsersNewPageForm'

export default class UsersNewPage extends React.Component {
  handleSubmit(data) {
    console.log(data);
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        body.append(key, data[key][0]);
      } else {
        body.append(key, data[key]);
      }
    });

    this.props.dispatch(actions.createUser(body, this.props.session))
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className='show-grid'>
        <Col xs={10}>
          <div className='account__heading'>
            <div className='account__heading-title'>Register</div>
          </div>
          <UsersNewPageForm onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

UsersNewPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {};
}

export default connect(select)(UsersNewPage);
