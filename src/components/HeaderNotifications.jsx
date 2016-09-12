import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'

const styles = {
  badgeStyle: {
    padding: 0,
    color: 'white',
    top: -5,
    right: -5
  },
  iconStyle: {
    verticalAlign: 'middle',
    color: 'white',
  }
}

export default class RidesShowPage extends React.Component {
  render() {
    const { userNotifications } = this.props

    return(
      <Link to="/users" className="header__notifications-button">
        <Badge
          badgeContent={userNotifications.pagination.total_count}
          primary={true}
          badgeStyle={styles.badgeStyle}
        >
          <IconButton
            tooltip="Notifications"
            iconStyle={styles.iconStyle}
          >
            <NotificationsIcon />
          </IconButton>
        </Badge>
      </Link>
    )
  }
}
