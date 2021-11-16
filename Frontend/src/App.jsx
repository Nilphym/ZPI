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
  ChangeUserDataPanel,
  TestPlansView
} from './components';
import {
  NotFound,
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
        <Route path="testPlans" element={<TestPlansView />} />
        <Route path="testPlan-e-:testPlanId" element={<TestPlan isEditable />} />
        <Route path="testPlan-:testPlanId" element={<TestPlan isEditable={false} />} />
        <Route path="testPlan-:testPlanId/test-e-:testId" element={<Test isEditable />} />
        <Route path="testPlan-:testPlanId/test-:testId" element={<Test isEditable={false} />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
