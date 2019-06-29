import React from "react";
import './Cards.sass';

export class SimpleCard extends React.Component{
  render(){
    const classNames = this.props.classNames ? this.props.classNames : ''
    return (
      <div className={"card " + classNames}>
        {this.props.children}
      </div>
    )
  }
}