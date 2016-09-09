import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton'
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import ActionSearch from 'material-ui/svg-icons/action/search'
import headerStyles from '../stylesheets/shared/Header'

const styles = {
  button: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  searchButton: {
    verticalAlign: 'middle',
    color: 'white',
    minWidth: 40
  },
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

const HeaderRight = () => (
  <div>
    <Link to="/users" className="header__notifications-button">
      <Badge
        badgeContent={10}
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
    <Link to="/rides">
      <IconButton
        tooltip="Search rides"
        iconStyle={styles.iconStyle}
      >
          <ActionSearch />
      </IconButton>
    </Link>
    <RaisedButton
      label="Add ride"
      labelPosition="after"
      icon={<ContentAddBox />}
      style={styles.button}
      containerElement={<Link to="/rides/new" />}
    />
  </div>
)

export default HeaderRight
