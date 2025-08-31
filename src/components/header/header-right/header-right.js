// utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { Add as ContentAddBox, Search as ActionSearch } from '@mui/icons-material'

// components
import { HeaderNotifications } from '../header-notifications/header-notifications'

const styles = {
  button: {
    marginLeft: 10,
    marginRight: 10,
    verticalAlign: 'super',
  },
  loginButton: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    verticalAlign: 'sub',
  },
  searchButton: {
    verticalAlign: 'middle',
    color: 'white',
    minWidth: 40,
  },
  badgeStyle: {
    padding: 0,
    color: 'white',
    top: -5,
    right: -5,
  },
  iconButtonStyle: {
    color: 'white',
  },
  iconStyle: {
    verticalAlign: 'middle',
  },
}

export class HeaderRight extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  renderHeaderRight() {
    const { isAuthenticated } = this.props

    if (isAuthenticated) {
      return this.renderLoggedInButtons()
    } else {
      return this.renderNotLoggedInButtons()
    }
  }

  renderLoggedInButtons() {
    return (
      <div>
        <HeaderNotifications {...this.props} />
        <Tooltip title="Search rides">
          <IconButton
            component={Link}
            to="/rides"
            sx={{ color: 'white' }}
          >
            <ActionSearch />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          startIcon={<ContentAddBox />}
          component={Link}
          to="/rides/new"
          sx={{ ml: 1, mr: 1 }}
        >
          Add ride
        </Button>
      </div>
    )
  }

  renderNotLoggedInButtons() {
    return(
      <div>
        <Button
          variant="outlined"
          component={Link}
          to="/login"
          sx={{ ml: 1, mr: 1, color: 'white', borderColor: 'white' }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
          sx={{ ml: 1, mr: 1 }}
        >
          Register
        </Button>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderHeaderRight()}
      </div>
    )
  }
}
