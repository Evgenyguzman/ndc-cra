import React from "react";
import { ItemsList } from "./ItemsList";
import { SimpleCard } from "../ui/Cards/Cards";

export class Items extends React.Component{
  render(){
    // console.log(this.props)
    const { addItemLink, ...rest } = this.props
    return(
      <React.Fragment>
        <SimpleCard>
          <div className="items-list-wrapper">
            <ItemsList {...rest} />
          </div>
          <div className={"btm-btn btm-right-btn"}>
            {addItemLink}
          </div>
        </SimpleCard>
        {/* <SimpleCard>
          <ItemCards parameters={this.props.parameters} />
        </SimpleCard> */}
      </React.Fragment>
    )
  }
}