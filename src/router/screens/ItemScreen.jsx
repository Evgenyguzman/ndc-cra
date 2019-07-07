import React from "react";
import { ItemContainer } from "../../containers/SystemContainers";


export function ItemScreen(props) {
  return (
    <div>
      <ItemContainer id={props.match.params.id} />
    </div>
  )
}