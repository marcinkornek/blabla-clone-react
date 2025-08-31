// utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge, IconButton, Popover, Tooltip } from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'

// components
import { NotificationsList } from '../../notifications/notifications-list/notifications-list'

const styles = {
  badgeStyle: {
    padding: 0,
    color: 'white',
    top: -5,
    right: -5,
  },
  badgeEmptyStyle: {
    display: 'none',
  },
  iconButtonStyle: {
    color: 'white',
  },
  fullIconStyle: {
    color: 'white',
    verticalAlign: 'middle',
  },
}

export class HeaderNotifications extends Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired
  }

  state = {
    open: false
  }

  handleClick = (event) => {
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  renderNotificationBadge() {
    const { notifications } = this.props

    return (
      <Badge
        badgeContent={notifications.pagination.unread_count || 0}
        color="error"
        invisible={notifications.pagination.unread_count === 0}
      >
        <Tooltip title="Notifications">
          <IconButton
            sx={{ color: 'white' }}
            onClick={this.handleClick}
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Badge>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onClose={this.handleRequestClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationsList {...this.props} />
      </Popover>
    )
  }

  render() {
    return (
      <span>
        {this.renderNotificationBadge()}
      </span>
    )
  }
}
