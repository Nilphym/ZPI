import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children, role, customValidation }) => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  if (customValidation && !customValidation()) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  if ((role && token.role !== role) || !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  role: PropTypes.string,
  customValidation: PropTypes.func
};

RequireAuth.defaultProps = {
  role: null,
  customValidation: null
};
