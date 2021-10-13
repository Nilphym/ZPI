import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';

import store from './redux/store';
import App from './App';
import AuthManager from './services/auth/AuthManager';
import theme from './utils/theme';
import MockServer from './services/server/MockServer';

ReactDOM.render(
  <React.StrictMode>
    <MockServer>
      <Provider store={store}>
        <BrowserRouter>
          <AuthManager>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </AuthManager>
        </BrowserRouter>
      </Provider>
    </MockServer>
  </React.StrictMode>,
  document.getElementById('root')
);
