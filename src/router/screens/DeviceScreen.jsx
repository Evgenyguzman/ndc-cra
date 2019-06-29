import React from "react";
import { DeviceContainer } from "../../containers/SystemContainers";

export function DeviceScreen(props) {
  console.log(props)
  return (
    <div>
      <DeviceContainer id={props.match.params.id} />
    </div>
  )
}