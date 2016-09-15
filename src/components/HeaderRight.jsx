import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import HeaderNotifications from './HeaderNotifications'

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

export default class HeaderRight extends Component {
  render() {
    const { currentUser } = this.props

    var right
    if (currentUser.isLoggedIn) {
      right =
        <div>
          <HeaderNotifications {...this.props} />
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
    }

    return(
      <div>
        {right}
      </div>
    )
  }
}
