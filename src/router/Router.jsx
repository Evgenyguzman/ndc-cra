import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Topbar } from '../components/ui/Topbars/Topbars';
import { AuthScreen } from './screens/AuthScreen';
import { NotFoundScreen } from './screens/NotFoundScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PrivateRoute } from './PrivateRoute';
import { SystemScreenContainer } from '../containers/MainContainers';

export default class Router extends Component {
  render() {
    const {store} = this.props
    return (
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route exact path="/" component={AboutScreen} />
          <Route path="/auth" component={AuthScreen} />
          <PrivateRoute path="/system" component={SystemScreenContainer} store={store} />
          <PrivateRoute path="/device/:id" component={SystemScreenContainer} store={store} />
          <PrivateRoute path="/item/:id" component={SystemScreenContainer} store={store} />
          {/* <PrivateRoute path="/devices/:id" component={DeviceScreen} store={store} /> */}
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}