import React, { PropTypes }  from 'react';
import Router, { Link }      from 'react-router'
import Bootstrap             from 'react-bootstrap'
import { connect }           from 'react-redux';
import _                     from 'underscore';

import CarsIndexPage         from './cars/CarsIndexPage'
import UsersEditPageForm     from '../../components/users/UsersEditPageForm'
import styles                from '../../stylesheets/users/Users'
import * as actions          from '../../actions/users';

export default class UsersEditPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {type: undefined}
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchUser(currentUserId))
    }
    this.setState({type: this.props.params.type})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({type: nextProps.params.type})
  }

  render() {
    const { dispatch, user, session } = this.props;
    var userEditMenu =
      <Bootstrap.Col xs={2} className='account-menu'>
        <div className='account-menu__heading'>
          Your profile
        </div>
        <Link to='/account/user' className='account-menu__item'>Profile</Link>
        <Link to='/account/cars' className='account-menu__item'>Cars</Link>
      </Bootstrap.Col>

    var userEditForm =
      <Bootstrap.Col xs={10}>
        <UsersEditPageForm
          user={user}
          onAddClick={user =>
            dispatch(actions.updateUser(user, session))
          } />
      </Bootstrap.Col>

    var carsIndex =
      <Bootstrap.Col xs={10}>
        <CarsIndexPage />
      </Bootstrap.Col>

    var editForm
    if (this.state.type === 'user') {
      editForm = userEditForm
    } else {
      editForm = carsIndex
    }

    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          {userEditMenu}
          {editForm}
        </Bootstrap.Row>
      </div>
    )
  }
}

UsersEditPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  return {
    session:       state.session.user,
    currentUserId: state.session.user.id,
    user:          state.user.user
  };
}

export default connect(select)(UsersEditPage);
