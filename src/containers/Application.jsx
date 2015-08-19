import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Header                from '../components/Header'
import * as actions          from '../actions/session';

export default class Application extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { dispatch, session, currentUser } = this.props
    console.log(currentUser);
    return (
      <div>
        <Header
          currentUser={currentUser}
          onLogout={text =>
            dispatch(actions.logout(currentUser))
          } />
        <div id='main'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    isLoggedIn:  state.session['isLoggedIn'],
    currentUser: state.session['user']
  };
}

export default connect(select)(Application);
