import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import HeaderNew             from '../components/HeaderNew'
import * as actions          from '../actions/session';
import injectTapEventPlugin  from 'react-tap-event-plugin';
import Dimensions            from 'react-dimensions'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class Application extends React.Component {
  render () {

    const { dispatch, currentUser, children } = this.props
    return (
      <div>
        <HeaderNew
          currentUser={currentUser}
          containerWidth={this.props.containerWidth}
          onLogout={text =>
            dispatch(actions.logout(this.context.router, currentUser))
          } />
        <div id='main' className='container'>
          {children}
        </div>
      </div>
    )
  }
}

Application.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    isLoggedIn:  state.session.isLoggedIn,
    currentUser: state.session.user
  };
}

export default Dimensions()(connect(select)(Application));
