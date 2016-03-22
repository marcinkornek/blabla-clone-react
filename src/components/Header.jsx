import React, { PropTypes } from 'react'
import Router, { Link }     from 'react-router'
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap'

export default class Header extends React.Component {
  render() {

    var rightNav
    if (this.props.currentUser.email) {
      rightNav =
        <Nav navbar pullRight>
          <NavDropdown eventKey={1} title={this.props.currentUser.email} id="basic-nav-dropdown">
            <MenuItem eventKey={1.1}><Link to='/account/user'>Account</Link></MenuItem>
            <MenuItem divider />
             <MenuItem eventKey={1.2}><a href='' onClick={this.handleLogout.bind(this)}>Logout</a></MenuItem>
          </NavDropdown>
        </Nav>
    } else {
      rightNav =
        <Nav navbar pullRight>
          <MenuItem eventKey={2}><Link to='/login'>Login</Link></MenuItem>
          <MenuItem eventKey={3}><Link to='/register'>Register</Link></MenuItem>
        </Nav>
    }

    var leftNav =
      <Nav>
        <MenuItem><Link to='/'>Home</Link></MenuItem>
        <MenuItem><Link to='/users'>Users</Link></MenuItem>
        <MenuItem><Link to='/rides'>Rides</Link></MenuItem>
      </Nav>

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            News App
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {leftNav}
          {rightNav}
        </Nav>
      </Navbar>
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
