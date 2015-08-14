import React           from 'react'
import Router          from 'react-router'
import Bootstrap       from 'react-bootstrap'
import RouterBootstrap from 'react-router-bootstrap'
import SessionStore    from '../../stores/SessionStore.coffee'
import SessionActionCreators from '../../actions/SessionActionCreators.coffee'

var Header = React.createClass({
  propTypes: {
    state: React.PropTypes.array
  },

  logout: function(e) {
    e.preventDefault();
    return SessionActionCreators.logout();
  },


  render: function() {
    var rightNav;
    // console.log 'this.props.state', this.props.state
    if (this.props.isLoggedIn) {
      rightNav =
        <Bootstrap.Nav navbar right>
          <Bootstrap.DropdownButton eventKey={3} title={this.props.email}>
            <Bootstrap.MenuItem eventKey='1'>Account</Bootstrap.MenuItem>
            <Bootstrap.MenuItem divider />
            <Bootstrap.MenuItem eventKey='2' onClick={this.logout}>Logout</Bootstrap.MenuItem>
          </Bootstrap.DropdownButton>
        </Bootstrap.Nav>
    } else {
      rightNav =
        <Bootstrap.Nav navbar right>
          <RouterBootstrap.NavItemLink to='login'>Login</RouterBootstrap.NavItemLink>
          <RouterBootstrap.NavItemLink to='app'>App</RouterBootstrap.NavItemLink>
        </Bootstrap.Nav>
    }

    return (
      <Bootstrap.Navbar fixedTop brand='News App' toggleNavKey={0}>
        <Bootstrap.CollapsibleNav>
          <Bootstrap.Nav navbar>
          </Bootstrap.Nav>
          {rightNav}
        </Bootstrap.CollapsibleNav>
      </Bootstrap.Navbar>
    )
  }
});

module.exports = Header
