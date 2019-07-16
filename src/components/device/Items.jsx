import React from "react";
import { ItemsList } from "./ItemsList";
import { SimpleCard } from "../ui/Cards/Cards";

export class Items extends React.Component{
  render(){
    // console.log(this.props)
    return(
      <React.Fragment>
        <SimpleCard>
          <ItemsList parameters={this.props.parameters} link={this.props.link} deleteBtn={this.props.deleteBtn} onRemove={this.props.onRemove} deviceId={this.props.deviceId} />
        </SimpleCard>
        {/* <SimpleCard>
          <ItemCards parameters={this.props.parameters} />
        </SimpleCard> */}
      </React.Fragment>
    )
  }
}