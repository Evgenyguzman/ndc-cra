import React from "react";

import './Buttons.sass';

export class Button extends React.Component{
  render(){
    return (
      <div>
        <button className="btn" onClick={this.props.onClick}>{this.props.children}</button>
      </div>
    )
  }
}