import React from 'react';
import {render} from 'react-dom';
import {MuiThemeProvider} from '@material-ui/core/styles/index';

import './styles/styles.css';
import AppRouter from './routers/AppRouter';
import {theme} from './theme/theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <AppRouter/>
  </MuiThemeProvider>
);

render(<App/>, document.getElementById('app'));
