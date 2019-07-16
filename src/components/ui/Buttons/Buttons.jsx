import React from "react";

import './Buttons.sass';
import { SimpleModal } from "../Modals/Modals";

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

export class ButtonWithPrompt extends React.Component{
  state = {
    isClicked: false
  }
  render(){
    const {children, onClick, ...rest} = this.props
    return (
      <div>
        <Button {...rest} onClick={()=>this.setState({isClicked: true})}>{children}</Button>
        <SimpleModal isOpen={this.state.isClicked}>
          <div>
            <p>Are you sure?</p>
            <Button onClick={()=>{this.setState({isClicked: false})}}>no</Button>
            <Button onClick={()=>{this.setState({isClicked: false});onClick(true)}}>yes</Button>
          </div>
        </SimpleModal>
      </div>
    )
  }
}
