import React, { PropTypes } from 'react'
import Router, { Link }     from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Header extends React.Component {
  render() {
    const { currentUser } = this.props;

    var navlinks = [
      <LinkContainer to='/'><NavItem eventKey={1}>Home</NavItem></LinkContainer>,
      <LinkContainer to='/users'><NavItem eventKey={2}>Users</NavItem></LinkContainer>,
      <LinkContainer to='/rides'><NavItem eventKey={3}>Rides</NavItem></LinkContainer>
    ]
    if (currentUser.email) {
      navlinks.push(
        <NavDropdown eventKey={4} title={currentUser.email} id="basic-nav-dropdown">
          <MenuItem eventKey={4.1}><Link to='/account/user'>Account</Link></MenuItem>
          <MenuItem divider />
           <MenuItem eventKey={4.2}><a href='' onClick={this.handleLogout.bind(this)}>Logout</a></MenuItem>
        </NavDropdown>
      )
    } else {
      navlinks.push(<LinkContainer to='/login'><NavItem eventKey={5}>Login</NavItem></LinkContainer>)
      navlinks.push(<LinkContainer to='/register'><NavItem eventKey={6}>Register</NavItem></LinkContainer>)
    }

    var Brand = <Link to='/'>Brand</Link>

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            {Brand}
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {_.map(navlinks, (n) => n)}
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
