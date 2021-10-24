import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';
import Logout from './containers/Logout';
import BugPage, { types } from './pages/BugPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="bugs" element={<BugPage type={types.all} />} />
        <Route path="bugs/assigned" element={<BugPage type={types.myBugs} />} />
        <Route path="bugs/active" element={<BugPage type={types.toFix} />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <p>dashboard</p>
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
