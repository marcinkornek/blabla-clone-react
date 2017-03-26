// utils
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'

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
        <Link to="/rides">
          <IconButton
            tooltip="Search rides"
            iconStyle={styles.iconButtonStyle}
          >
              <ActionSearch style={styles.iconStyle} />
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
  }

  renderNotLoggedInButtons() {
    return(
      <div>
        <RaisedButton
          label="Login"
          style={styles.loginButton}
          containerElement={<Link to="/login" />} />
        <RaisedButton
          label="Register"
          style={styles.loginButton}
          secondary={true}
          containerElement={<Link to="/register" />} />
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
