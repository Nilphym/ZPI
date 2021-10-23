import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './containers/Layout';
import NoMatch from './containers/NoMatch';
import RequireAuth from './services/auth/RequireAuth';
import Login from './components/LoginPanel/LoginPanel';
import Logout from './containers/Logout';
import BugPage, { types } from './pages/BugPage';
import BugTable from './components/Table';
import { SelectColumnFilter } from './components/Table/CustomFilter';

const App = () => {
  const data = React.useMemo(
    () => [
      {
        firstName: 'heee',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      },
      {
        firstName: 'pump',
        lastName: 'farmer',
        age: 5,
        visits: 52,
        progress: 94,
        status: 'complicated',
        subRows: undefined
      }
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Visits',
        accessor: 'visits'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress'
      }
    ],
    []
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="bugs"
          element={<BugTable title="Bugs" initialPageSize={5} data={data} columns={columns} />}
        />
        {/* <Route path="bugs" element={<BugPage type={types.all} />} /> */}
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
