import React from "react";
import { Switch } from "react-router-dom";

import './sass/SystemScreen.sass';
import { SidebarContainer } from "../../containers/SystemContainers";
import { PrivateRoute } from "../PrivateRoute";
import { DevicesScreen } from "./DevicesScreen";
import { DeviceScreen } from "./DeviceScreen";
import { ItemScreen } from "./ItemScreen";
import { Preloader } from "../../components/ui/Preloaders/Preloaders";

export class SystemScreen extends React.Component{
  render(){
    const {store, isConnected} = this.props
    // console.log(isConnected)
    if(isConnected){
      return (
        <div className="system-wrapper">
          <SidebarContainer />
          <div className="content">
            <Switch>
              <PrivateRoute path="/system" component={DevicesScreen} store={store} />
              <PrivateRoute path="/device/:id" component={DeviceScreen} store={store} />
              <PrivateRoute path="/item/:id" component={ItemScreen} store={store} />
            </Switch>
          </div>
        </div>
      )
    }else{
      return <Preloader />
    }
  }
}