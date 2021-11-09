import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterLuxon';

import store from './redux/store';
import App from './App';
import theme from './utils/theme';
import { AuthManager, MockServer } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MockServer>
        <BrowserRouter>
          <AuthManager>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </LocalizationProvider>
          </AuthManager>
        </BrowserRouter>
      </MockServer>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
