import React, { Component, PropTypes } from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import NotificationsList from './header/NotificationsList'

const styles = {
  badgeStyle: {
    padding: 0,
    color: 'white',
    top: -5,
    right: -5
  },
  iconStyle: {
    color: 'white',
  }
}

export default class RidesShowPage extends React.Component {
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
    });
  };

  render() {
    const { userNotifications } = this.props

    return(
      <Badge
        className="header__notifications__button"
        badgeContent={userNotifications.pagination.total_count || 0}
        primary={true}
        badgeStyle={styles.badgeStyle}
      >
        <IconButton
          tooltip="Notifications"
          iconStyle={styles.iconStyle}
          onTouchTap={this.handleTouchTap}
        >
          <NotificationsIcon />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}
          >
            <NotificationsList userNotifications={userNotifications} />
          </Popover>
        </IconButton>
      </Badge>
    )
  }
}
