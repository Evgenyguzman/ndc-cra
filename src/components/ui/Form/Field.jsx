import React from "react";
import { Switch, InputText, InputInteger, Enum, InputIP } from "../Inputs/Inputs";

import './style.sass';

export class Field extends React.Component{
  // constructor(props){
  //   super(props)
  // }
  componentWillMount(){
    // обработка default-value
    if(this.props.value === undefined) {
      this.props.onChange(this.props.data['default-value'] || '', this.props.data.name, true)
    }
  }
  render(){
    const {data} = this.props
    // console.log(data.type, data.name)
    // use hoc

    // ???
    if(this.props.value === undefined) return null

    if(data.type === 'boolean'){
      // switch
      return withLabel(<Switch name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name, this.props.error)
    }else if(data.type === 'text'){
      // input type text
      return withLabel(<InputText type="text" name={data.name} value={this.props.value} minLength={data.minLength} onChange={this.props.onChange} />, data.name, this.props.error)
    }else if(data.type === 'integer'){
      // input type number
      return withLabel(<InputInteger name={data.name} value={this.props.value} min={data.min} max={data.max} onChange={this.props.onChange} />, data.name, this.props.error)
    }else if(data.type === 'enum'){
      // select
      return withLabel(<Enum name={data.name} values={data.values} value={this.props.value} onChange={this.props.onChange} /> , data.name, this.props.error)
    }else if(data.type === 'net-address'){
      // ip
      return withLabel(<InputIP name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name, this.props.error)
    }
    return withLabel(<InputText type="text" name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name, this.props.error)
  }
}

const withLabel = (component, label, error) => {
  const classname = error ? 'error' : ''
  return(
    <div className={"field " + classname}>
      { label ? <label>{label}</label> : null }
      <span className="msg">Проверьте поле</span>
      { component }
    </div>
  )
}