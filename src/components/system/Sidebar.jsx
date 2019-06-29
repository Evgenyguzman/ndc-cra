import React from "react";

import './System.sass';
import { SimpleCard } from "../ui/Cards/Cards";
import { SimpleLink } from "../ui/Links/Links";

export class Sidebar extends React.Component{
  render(){
    return (
      <div className="sidebar">
        <div>
          <h5>Устройства</h5>
        {
          this.props.devices.map((device, i)=>
            <SimpleCard key={i}>
              <SimpleLink to={'/device/'+device.id}>{device.name}</SimpleLink>
            </SimpleCard>
          )
        }
        </div>
      </div>
    )
  }
}