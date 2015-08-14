React           = require('react')
Router          = require('react-router')
Bootstrap       = require('react-bootstrap')
RouterBootstrap = require('react-router-bootstrap')
SessionStore    = require('../../stores/SessionStore.coffee')
SessionActionCreators = require('../../actions/SessionActionCreators.coffee')

Header = React.createClass
  propTypes:
    # isLoggedIn: React.PropTypes.bool
    # email:      React.PropTypes.string
    state: React.PropTypes.array

  logout: (e) ->
    e.preventDefault()
    SessionActionCreators.logout()

  render: ->
    console.log '@props.state', @props.state
    if @props.isLoggedIn
      rightNav =
        <Bootstrap.Nav navbar right>
          <Bootstrap.DropdownButton eventKey={3} title={@props.email}>
            <Bootstrap.MenuItem eventKey='1'>Account</Bootstrap.MenuItem>
            <Bootstrap.MenuItem divider />
            <Bootstrap.MenuItem eventKey='2' onClick={@logout}>Logout</Bootstrap.MenuItem>
          </Bootstrap.DropdownButton>
        </Bootstrap.Nav>
    else
      rightNav =
        <Bootstrap.Nav navbar right>
          <RouterBootstrap.NavItemLink to='login'>Login</RouterBootstrap.NavItemLink>
          <RouterBootstrap.NavItemLink to='app'>App</RouterBootstrap.NavItemLink>
        </Bootstrap.Nav>

    <Bootstrap.Navbar fixedTop brand='News App' toggleNavKey={0}>
      <Bootstrap.CollapsibleNav>
        <Bootstrap.Nav navbar>
        </Bootstrap.Nav>
        {rightNav}
      </Bootstrap.CollapsibleNav>
    </Bootstrap.Navbar>

module.exports = Header
