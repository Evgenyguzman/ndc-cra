import React from "react";
import { SimpleTabs } from "../ui/Tabs/Tabs";

export class Tabs extends React.Component{
  render(){
    return <SimpleTabs charts={this.props.charts} />
  }
}