import React from "react";
import { Link } from "react-router-dom";

import './Links.sass';

export class SimpleLink extends React.Component{
  render(){
    return (
      <div>
        <Link className="link" to={this.props.to}>{this.props.children}</Link>
      </div>
    )
  }
}