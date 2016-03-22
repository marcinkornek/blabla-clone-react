import React, { PropTypes }  from 'react';
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import UsersNewPageForm      from '../../components/users/UsersNewPageForm'

export default class UsersNewPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className='show-grid'>
        <Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <UsersNewPageForm
            onAddClick={text =>
              dispatch(actions.createUser(text))
            } />
        </Col>
      </div>
    )
  }
}

UsersNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
  };
}

export default connect(select)(UsersNewPage);
