import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import { RequireAuth } from './providers';
import { Logout } from './containers';
import {
  LoginPanel,
  TestPlan,
  Test,
  RegisterPanel,
  ResetPasswordPanel,
  ChangeUserDataPanel
} from './components';
import {
  NoMatch,
  AssignedBugsPage,
  ActiveBugsPage,
  AllBugsPage,
  TestRunPage,
  RetestBugsPage
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPanel />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<RegisterPanel />} />
        <Route path="resetPassword" element={<ResetPasswordPanel />} />
        <Route path="changeUserData" element={<ChangeUserDataPanel />} />
        <Route path="bugs" element={<AllBugsPage />} />
        <Route path="bugs/assigned" element={<AssignedBugsPage />} />
        <Route path="bugs/active" element={<ActiveBugsPage />} />
        <Route path="bugs/retest" element={<RetestBugsPage />} />
        <Route path="test/execution" element={<TestRunPage />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <p>dashboard</p>
            </RequireAuth>
          }
        />
        <Route path="testPlan-:testPlanId" element={<TestPlan />} />
        <Route path="testPlan-:testPlanId/test-e-:testId" element={<Test isEditable />} />
        <Route path="testPlan-:testPlanId/test-:testId" element={<Test isEditable={false} />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
