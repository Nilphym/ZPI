import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import { RequireAuth } from './providers';
import { Logout } from './containers';
import { LoginPanel, TestPlan, Test } from './components';
import { NoMatch, BugPage, bugTableTypes } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPanel />} />
        <Route path="logout" element={<Logout />} />
        <Route path="bugs" element={<BugPage type={bugTableTypes.all} />} />
        <Route path="bugs/assigned" element={<BugPage type={bugTableTypes.myBugs} />} />
        <Route path="bugs/active" element={<BugPage type={bugTableTypes.toFix} />} />
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
