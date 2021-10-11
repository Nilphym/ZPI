import React from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';

import theme from '../src/utils/theme';
import MockServer from '../src/services/server/MockServer';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <MockServer>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </MockServer>
    </MemoryRouter>
  )
];
