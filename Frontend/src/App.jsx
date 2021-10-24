import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';
import Logout from './containers/Logout';
import TestPlan from './components/TestPlan/TestPlan';
import Test from './components/Test/Test';
import BugPage, { tableTypes } from './pages/BugPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="bugs" element={<BugPage type={tableTypes.all} />} />
        <Route path="bugs/assigned" element={<BugPage type={tableTypes.myBugs} />} />
        <Route path="bugs/active" element={<BugPage type={tableTypes.toFix} />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <p>dashboard</p>
            </RequireAuth>
          }
        />
        <Route path="testPlan-:testPlanId" element={<TestPlan />} />
        <Route path="testPlan-:testPlanId/test-:testId" element={<Test isEditable />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
