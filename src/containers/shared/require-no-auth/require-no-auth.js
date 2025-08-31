import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const requireNoAuth = (Component) => {
  const AuthenticatedComponent = ({ isAuthenticated, ...props }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Component {...props} />;
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.session.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default requireNoAuth;