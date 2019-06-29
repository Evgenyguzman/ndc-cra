import React from "react";

export class InputText extends React.Component{
  render(){
    return (
      <div>
        <input type={(this.props.type ? this.props.type : 'text')} name={this.props.name} value={this.props.value} onChange={(event)=>this.props.onChange(event.target.value)} />
      </div>
    )
  }
}

export class InputCheckbox extends React.Component{
  render(){
    return (
      <div>
        <input type="checkbox" name={this.props.name} checked={this.props.value} onChange={(event)=>this.props.onChange(event.target.checked)} />
      </div>
    )
  }
}