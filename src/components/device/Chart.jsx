import React from "react";
import { LineChart } from "../ui/Charts";

export class Chart extends React.Component{
  async componentWillMount(){
    const data = await this.props.getItemDataStorage({'item-id': this.props.itemId})
  }
  render(){
    return <LineChart />
  }
}