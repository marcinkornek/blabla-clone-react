import React           from 'react'
import Router          from 'react-router'
import { Link }        from 'react-router'
import Bootstrap       from 'react-bootstrap'

export default class Header extends React.Component {
  render() {
    return (
      <Bootstrap.Navbar fixedTop brand='News App' toggleNavKey={0}>
        <Bootstrap.CollapsibleNav>
          <Bootstrap.Nav navbar>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
          </Bootstrap.Nav>
        </Bootstrap.CollapsibleNav>
      </Bootstrap.Navbar>
    )
  }
}
