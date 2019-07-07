import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Topbar } from '../components/ui/Topbars/Topbars';
import { AuthScreen } from './screens/AuthScreen';
import { NotFoundScreen } from './screens/NotFoundScreen';
import { DeviceScreen } from './screens/DeviceScreen';
import { SystemScreen } from './screens/SystemScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PrivateRoute } from './PrivateRoute';

export default class Router extends Component {
  render() {
    const {store} = this.props
    return (
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route exact path="/" component={AboutScreen} />
          <Route path="/auth" component={AuthScreen} />
          <PrivateRoute path="/system" component={SystemScreen} store={store} />
          <PrivateRoute path="/device/:id" component={SystemScreen} store={store} />
          <PrivateRoute path="/item/:id" component={SystemScreen} store={store} />
          <PrivateRoute path="/devices/:id" component={DeviceScreen} store={store} />
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}