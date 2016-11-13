import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { spacing, typography, zIndex } from 'material-ui/styles'
import { cyan500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'
import SocialGroup from 'material-ui/svg-icons/social/group'
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car'
import DriverIcon from './icons/DriverIcon'
import PassengerIcon from './icons/PassengerIcon'
import Delete from 'material-ui/svg-icons/action/delete'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'

const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  avatatStyle: {
    marginRight: 10
  }
}

export class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value
  }

  handleTouchTapHeader = () => {
    this.context.router.push('/')
    this.props.onRequestChangeNavDrawer(false)
  }

  renderLeftHeader() {
    const { isLoggedIn, isFetching, currentUser } = this.props

    if (isFetching || !isLoggedIn) {
      return(
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Blabla Clone
        </div>
      )
    } else {
      return(
        <div style={styles.logo}>
          <Link to={`/users/${currentUser.id}`}>
            <Avatar src={currentUser.avatar} style={styles.avatatStyle} />
            <span>{currentUser.full_name}</span>
          </Link>
        </div>
      )
    }
  }

  nestedAccountItems() {
    const { isLoggedIn, onLogout } = this.props
    if (isLoggedIn) {
      return (
        <ListItem
          primaryText="My account"
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem primaryText="My profile" value="/account/user" key="my-profile" leftIcon={<ActionAccountBox />}/>,
            <ListItem primaryText="My cars" value="/account/cars" key="my-cars" leftIcon={<MapsDirectionsCar />} />,
            <ListItem primaryText="My rides as driver" value="/account/rides_as_driver" key="my-rides-driver" leftIcon={<DriverIcon />}/>,
            <ListItem primaryText="My rides as passenger" value="/account/rides_as_passenger" key="my-rides-passenger" leftIcon={<PassengerIcon />}/>,
            <MenuItem onTouchTap={onLogout} primaryText="Logout" key="logout" leftIcon={<Delete />} />
          ]}/>
      )
    } else {
      return (
        [
          <ListItem primaryText='Login' value='/login' key="login" />,
          <ListItem primaryText='Register' value='/register' key="register" />
        ]
      )
    }
  }

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      onLogout,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.drawer - 100}}
      >
        {this.renderLeftHeader()}
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}
        >
          <ListItem
            primaryText="Rides"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Add ride" value="/rides/new" key="add-ride" leftIcon={<ContentAddBox />}/>,
              <ListItem primaryText="Search rides" value="/rides" key="search-rides" leftIcon={<ActionSearch />}/>,
            ]}
          />
          <ListItem
            primaryText="Users"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Browse users" value="/users" key="browse-users" leftIcon={<SocialGroup />} />,
            ]}
          />
          {this.nestedAccountItems()}
        </SelectableList>
      </Drawer>
    )
  }
}
