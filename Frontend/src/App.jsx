import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="login/*" element={null} />
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
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
