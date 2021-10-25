import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/auth/authSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Navigate to="/login" />;
};

export default Logout;
