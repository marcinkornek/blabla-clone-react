import React, { PropTypes } from 'react'
import Router, { Link }     from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Header extends React.Component {
  render() {
    const { currentUser } = this.props;

    var navlinks = [
      <LinkContainer key='main' to='/'><NavItem eventKey={1}>Home</NavItem></LinkContainer>,
      <LinkContainer key='users' to='/users'><NavItem eventKey={2}>Users</NavItem></LinkContainer>,
      <LinkContainer key='rides' to='/rides'><NavItem eventKey={3}>Rides</NavItem></LinkContainer>
    ]
    if (currentUser.email) {
      navlinks.push(
        <NavDropdown key ='dropdown' eventKey={4} title={currentUser.email} id="basic-nav-dropdown">
          <LinkContainer to='/account/user'><MenuItem eventKey={4.1}>Account</MenuItem></LinkContainer>
          <MenuItem divider />
          <MenuItem eventKey={4.2} onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
        </NavDropdown>
      )
    } else {
      navlinks.push(<LinkContainer key='login' to='/login'><NavItem eventKey={5}>Login</NavItem></LinkContainer>)
      navlinks.push(<LinkContainer key='register' to='/register'><NavItem eventKey={6}>Register</NavItem></LinkContainer>)
    }

    var Brand = <Link to='/'>Brand</Link>

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            {Brand}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {_.map(navlinks, (n) => n)}
          </Nav>
        </Navbar.Collapse>
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
