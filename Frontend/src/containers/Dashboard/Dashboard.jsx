import React from 'react';
import { Box } from '@mui/material';

import { Statistic, PieChart, PercentageChart, DoughnutChart } from '../../components';

export const Dashboard = () => {
  const args = {
    daysFromStart: 54,
    testersNumber: 13,
    devsNumber: 10,
    testSuitesNumber: 21,
    testSuitesByNames: [
      { name: 'Login', value: 13 },
      { name: 'Add new product', value: 18 },
      { name: 'Shop', value: 4 },
      { name: 'Pay bills', value: 7 }
    ]
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplate: 'repeat(5, 9rem) / repeat(3, max-content)',
        gap: '2rem',
        justifyContent: 'center'
      }}
    >
      <Statistic name="Days from product start" number={args.daysFromStart} icon="time" />
      <Statistic name="Testers" number={args.testersNumber} icon="person" />
      <Statistic name="Developers" number={args.devsNumber} icon="person" />
      <PieChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs by impact"
        label="Total bugs"
        data={[
          { name: 'High', value: 13 },
          { name: 'Medium', value: 19 },
          { name: 'Low', value: 6 }
        ]}
      />
      <PieChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs by priority"
        label="Total bugs"
        data={[
          { name: 'High', value: 22 },
          { name: 'Medium', value: 12 },
          { name: 'Low', value: 4 }
        ]}
      />
      <Statistic name="Test suites" number={args.testSuitesNumber} icon="test" />
      <Statistic name="Rejected bugs" number={5} icon="bug" />
      <DoughnutChart
        sx={{ gridColumn: 'span 2', gridRow: 'span 2' }}
        name="Test suites"
        label="Tests"
        data={args.testSuitesByNames}
      />
      <PercentageChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs fixed"
        completedLabel="Fixed"
        all={52}
        completed={17}
      />
    </Box>
  );
};

export default Dashboard;
