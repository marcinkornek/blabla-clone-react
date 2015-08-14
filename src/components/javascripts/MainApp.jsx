import React        from 'react'
import Router       from 'react-router'
import styles       from '../stylesheets/MainApp.scss'
import Header       from './Header.jsx'
import SessionStore from '../../stores/SessionStore.coffee'

var getStateFromStores = function() {
  console.log('getstate', SessionStore.getState());
  return SessionStore.getState();
};

var MainApp = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Router.RouteHandler />
      </div>
    );
  }
});

module.exports = MainApp
