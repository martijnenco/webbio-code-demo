import React from 'react';
import {render} from 'react-dom';

import './styles/styles.css';
import AppRouter from './routers/AppRouter';

const App = () => (
  <AppRouter/>
);

render(<App/>, document.getElementById('app'));
