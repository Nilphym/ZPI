import React from 'react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';

import theme from '../src/utils/theme';
import MockServer from '../src/services/server/MockServer';
import store from '../src/redux/store';

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
      <Provider store={store}>
        <MockServer>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Story />
            </ThemeProvider>
          </LocalizationProvider>
        </MockServer>
      </Provider>
    </MemoryRouter>
  )
];
