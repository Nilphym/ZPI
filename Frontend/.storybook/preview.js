import React from 'react';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';

import theme from '../src/utils/theme';
import { MemoryRouter } from 'react-router';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  )
];
