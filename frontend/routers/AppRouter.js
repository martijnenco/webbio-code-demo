import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import PublicRoute from './PublicRouter';
//Public
import HomePage from '../components/HomePage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/" component={HomePage} exact={true}/>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
