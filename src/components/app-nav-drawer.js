// src/components/app-nav-drawer.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
  MenuItem,
  Box,
} from '@mui/material';
import { cyan } from '@mui/material/colors';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Custom icons
import DriverIcon from './icons/DriverIcon';
import PassengerIcon from './icons/PassengerIcon';

// Router
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function AppNavDrawer(props) {
  const {
    docked,
    open,
    style,
    onRequestChangeNavDrawer,
    onLogout,
    onChangeList,
    isFetching,
    isStarted,
    isAuthenticated,
    currentUser,
  } = props;

  const [openRides, setOpenRides] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const location = useLocation();

  const toggle = (setter, current) => () => setter(!current);

  const isSelected = (path) => location.pathname === path;

  const handleHeaderClick = () => {
    if (onRequestChangeNavDrawer) onRequestChangeNavDrawer(false);
  };

  const renderLeftHeader = () => {
    if (!isFetching && isStarted && isAuthenticated && currentUser) {
      return (
        <Box
          sx={{
            cursor: 'pointer',
            fontSize: 24,
            color: '#fff',
            lineHeight: '56px',
            fontWeight: 300,
            backgroundColor: cyan[500],
            paddingLeft: 2,
            marginBottom: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
          }}
        >
          <Link
            to={`/users/${currentUser.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Avatar src={currentUser.avatar} sx={{ width: 32, height: 32, marginRight: 1.5 }} />
            <span>{currentUser.full_name}</span>
          </Link>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          cursor: 'pointer',
          fontSize: 24,
          color: '#fff',
          lineHeight: '56px',
          fontWeight: 300,
          backgroundColor: cyan[500],
          paddingLeft: 2,
          marginBottom: 1,
        }}
        onClick={handleHeaderClick}
      >
        Blabla Clone
      </Box>
    );
  };

  const renderAccountSection = () => {
    if (isAuthenticated) {
      return (
        <>
          <ListItem button onClick={toggle(setOpenAccount, openAccount)}>
            <ListItemText primary="My account" />
            {openAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openAccount} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/account/user"
                selected={isSelected('/account/user')}
                onClick={() => onChangeList && onChangeList(null, '/account/user')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                <ListItemText primary="My profile" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/account/cars"
                selected={isSelected('/account/cars')}
                onClick={() => onChangeList && onChangeList(null, '/account/cars')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                <ListItemText primary="My cars" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/account/rides_as_driver"
                selected={isSelected('/account/rides_as_driver')}
                onClick={() => onChangeList && onChangeList(null, '/account/rides_as_driver')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon><DriverIcon /></ListItemIcon>
                <ListItemText primary="My rides as driver" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/account/rides_as_passenger"
                selected={isSelected('/account/rides_as_passenger')}
                onClick={() => onChangeList && onChangeList(null, '/account/rides_as_passenger')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon><PassengerIcon /></ListItemIcon>
                <ListItemText primary="My rides as passenger" />
              </ListItem>

              <Box sx={{ pl: 4 }}>
                <MenuItem onClick={onLogout}>
                  <ListItemIcon><DeleteIcon /></ListItemIcon>
                  Logout
                </MenuItem>
              </Box>
            </List>
          </Collapse>
        </>
      );
    }

    return (
      <>
        <ListItem
          button
          component={Link}
          to="/login"
          selected={isSelected('/login')}
          onClick={() => onChangeList && onChangeList(null, '/login')}
        >
          <ListItemText primary="Login" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/register"
          selected={isSelected('/register')}
          onClick={() => onChangeList && onChangeList(null, '/register')}
        >
          <ListItemText primary="Register" />
        </ListItem>
      </>
    );
  };

  return (
    <Drawer
      variant={docked ? 'permanent' : 'temporary'}
      open={open}
      onClose={() => onRequestChangeNavDrawer && onRequestChangeNavDrawer(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          ...style,
        },
      }}
    >
      {renderLeftHeader()}

      <List component="nav" aria-label="main navigation">
        {/* Rides */}
        <ListItem button onClick={toggle(setOpenRides, openRides)}>
          <ListItemText primary="Rides" />
          {openRides ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openRides} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/rides/new"
              selected={isSelected('/rides/new')}
              onClick={() => onChangeList && onChangeList(null, '/rides/new')}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><AddBoxIcon /></ListItemIcon>
              <ListItemText primary="Add ride" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/rides"
              selected={isSelected('/rides')}
              onClick={() => onChangeList && onChangeList(null, '/rides')}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search rides" />
            </ListItem>
          </List>
        </Collapse>

        {/* Users */}
        <ListItem button onClick={toggle(setOpenUsers, openUsers)}>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/users"
              selected={isSelected('/users')}
              onClick={() => onChangeList && onChangeList(null, '/users')}
              sx={{ pl: 4 }}
            >
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Browse users" />
            </ListItem>
          </List>
        </Collapse>

        {/* Account */}
        {renderAccountSection()}
      </List>
    </Drawer>
  );
}

AppNavDrawer.propTypes = {
  docked: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onRequestChangeNavDrawer: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onChangeList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avatar: PropTypes.string,
    full_name: PropTypes.string,
  }),
};
