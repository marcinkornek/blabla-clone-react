import React, { PropTypes } from 'react'
import Router, { Link }     from 'react-router'
import Bootstrap            from 'react-bootstrap'

export default class Header extends React.Component {
  render() {

    var rightNav
    if (this.props.currentUser.email) {
      rightNav =
        <Bootstrap.Nav navbar right>
          <Bootstrap.DropdownButton eventKey={3} title={this.props.currentUser.email}>
            <li><Link to='/account/user'>Account</Link></li>
            <Bootstrap.MenuItem divider />
            <li><a href='' onClick={this.handleLogout.bind(this)}>Logout</a></li>
          </Bootstrap.DropdownButton>
        </Bootstrap.Nav>
    } else {
      rightNav =
        <Bootstrap.Nav navbar right>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </Bootstrap.Nav>
    }

    var leftNav =
      <Bootstrap.Nav navbar>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/users'>Users</Link></li>
      </Bootstrap.Nav>

    return (
      <Bootstrap.Navbar fixedTop brand='News App' toggleNavKey={0}>
        <Bootstrap.CollapsibleNav>
          {leftNav}
          {rightNav}
        </Bootstrap.CollapsibleNav>
      </Bootstrap.Navbar>
    )
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.onLogout();
  }
}

Header.propTypes = {
  onLogout: PropTypes.func.isRequired
};
