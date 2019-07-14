import React from "react";

import './Buttons.sass';

export class Button extends React.Component{
  render(){
    const {disabled} = this.props
    return (
      <div>
        <button className="btn" disabled={disabled ? true : false} onClick={this.props.onClick}>{this.props.children}</button>
      </div>
    )
  }
}
