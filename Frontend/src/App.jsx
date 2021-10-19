import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';
import Logout from './containers/Logout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login/*" element={<Login />} />
        <Route path="register/project/*" element={null} />
        <Route path="register/user/*" element={null} />
        <Route
          path="projects/*"
          element={
            <RequireAuth>
              <p>pies</p>
            </RequireAuth>
          }
        />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
