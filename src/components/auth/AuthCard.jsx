import React from "react";

import './Auth.sass';
import { SimpleCard } from "../ui/Cards/Cards";

export class AuthCard extends React.Component{
  render(){
    return (
      <SimpleCard classNames={this.props.classNames}>
        {this.props.children}
      </SimpleCard>
    )
  }
}