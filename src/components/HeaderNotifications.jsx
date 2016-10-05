import React, { Component, PropTypes } from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import NotificationsList from './notifications/notifications-list/notifications-list'

const styles = {
  badgeStyle: {
    padding: 0,
    color: 'white',
    top: -5,
    right: -5
  },
  badgeEmptyStyle: {
    display: 'none',
  },
  iconButtonStyle: {
    color: 'white',
  },
  fullIconStyle: {
    color: 'white',
    verticalAlign: 'middle'
  },
  emptyIconStyle: {
    color: 'white',
    verticalAlign: 'middle'
  }
}

export default class HeaderNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
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
    return(
      <Badge
        className="header__notifications__button"
        badgeContent={notifications.pagination.unread_count || 0}
        primary={true}
        badgeStyle={notifications.pagination.unread_count > 0 ? styles.badgeStyle : styles.badgeEmptyStyle}
      >
        <IconButton
          tooltip="Notifications"
          iconStyle={styles.iconButtonStyle}
          onTouchTap={this.handleTouchTap}
        >
          <NotificationsIcon style={styles.fullIconStyle} />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}
          >
            <NotificationsList {...this.props} />
          </Popover>
        </IconButton>
      </Badge>
    )
  }

  render() {
    return(
      <span>
       {this.renderNotificationBadge()}
      </span>
    )
  }
}
