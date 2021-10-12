import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectToken, logout } from '../../redux/reducers/auth/authSlice';

export const AuthServiceManager = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token && token.exp * 1000 < Date.now()) {
      dispatch(logout());
    }
  }, [pathname]);

  return children;
};

export default AuthServiceManager;

AuthServiceManager.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
