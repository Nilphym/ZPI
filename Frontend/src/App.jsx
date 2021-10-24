import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';
import Logout from './containers/Logout';
import TestPlan from './components/TestPlan/TestPlan';
import Test from './components/Test/Test';

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
        <Route path="testPlan-:testPlanId" element={<TestPlan />} />
        <Route path="testPlan-:testPlanId/test-:testId" element={<Test isEditable/>} />

        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
