import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Button } from "../ui/Buttons/Buttons";
import { SimpleLink } from "../ui/Links/Links";

export class DeviceList extends React.Component{
  render(){
    let devices = this.props.devices
    // if(devices.length === 0) return "Устройства отсутствуют"
    // devices = Array.from(devices.values())
    return (
      <div>
        {
          devices.map((device, i)=>
            <SimpleCard key={i}>
              <h3>{device.name}</h3>
              <Button>
                <SimpleLink to={"/device/"+device.id}>Перейти</SimpleLink>
              </Button>
            </SimpleCard>
          )
        }
      </div>
    )
  }
}