import React from "react";
import { Switch } from "react-router-dom";

import './sass/SystemScreen.sass';
import { SidebarContainer } from "../../containers/SystemContainers";
import { PrivateRoute } from "../PrivateRoute";
import { DevicesScreen } from "./DevicesScreen";
import { DeviceScreen } from "./DeviceScreen";

export class SystemScreen extends React.Component{
  render(){
    const {store} = this.props
    return (
      <div className="system-wrapper">
        {/* <SystemContainer /> */}
        <SidebarContainer />
        <div className="content">
          <Switch>
            <PrivateRoute path="/system" component={DevicesScreen} store={store} />
            <PrivateRoute path="/device/:id" component={DeviceScreen} store={store} />
          </Switch>
        </div>
      </div>
    )
  }
}