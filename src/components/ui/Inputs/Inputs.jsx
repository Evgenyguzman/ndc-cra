import React from "react";

import Select from 'react-select'

import './Inputs.sass';

export class Input extends React.Component{
  render(){
    const {data} = this.props
    // console.log(data.type, data.name)
    // use hoc

    if(data.type === 'boolean'){
      // switch
      return withLabel(<Switch name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name)
    }else if(data.type === 'text'){
      // input type text
      return withLabel(<InputText type="text" name={data.name} value={this.props.value} minLength={data.minLength} onChange={this.props.onChange} />, data.name)
    }else if(data.type === 'integer'){
      // input type number
      return withLabel(<InputInteger name={data.name} value={this.props.value} min={data.min} max={data.max} onChange={this.props.onChange} />, data.name)
    }else if(data.type === 'enum'){
      // select
      return withLabel(<Enum name={data.name} values={data.values} value={this.props.value} onChange={this.props.onChange} /> , data.name)
    }else if(data.type === 'net-address'){
      // ip
      return withLabel(<InputIP name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name)
    }
    return withLabel(<InputText type="text" name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name)
  }
}

const withLabel = (component, label) => {
  return(
    <div>
      { label ? <label>{label}</label> : null }
      { component }
    </div>
  )
}

export class InputText extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value
    }
    this.onChangeCompleted = this.onChangeCompleted.bind(this)
  }

  componentWillMount(){
    this.onChangeCompleted()
  }

  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  onChangeCompleted(){
    // validate
    const {value} = this.state
    const {onChange, name, minLength} = this.props
    if(value.length < minLength){
      onChange(value, name, true)
    }else{
      onChange(value, name, false)
    }
    
  }
  render(){
    return (
      <React.Fragment>
        <input type={(this.props.type ? this.props.type : 'text')} name={this.props.name} value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} onBlur={this.onChangeCompleted} />
      </React.Fragment>
    )
  }
}

export class Switch extends React.Component{
  componentWillMount(){
    const { name, value } = this.props
    const isChecked = typeof value === 'boolean' ? value : value === 'true'
    this.props.onChange(isChecked, name, false)
  }
  render() {
    const { name, value } = this.props
    const isChecked = typeof value === 'boolean' ? value : value === 'true' 
    return (
      <React.Fragment>
        <label className="switch">
          <input type="checkbox" name={name} checked={isChecked} onChange={(e) => {this.props.onChange(e.target.checked, name, false)}} />
          <span className="slider round"></span>
        </label>
      </React.Fragment>
    )
  }
}
export class InputIP extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value
    }
    this.onChangeCompleted = this.onChangeCompleted.bind(this)
  }
  componentWillMount(){
    this.onChangeCompleted()
  }
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  onChangeCompleted(){
    // validate
    const regexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?$/gm
    const res = regexp.test(this.state.value)
    // console.log(res)
    if(res){
      this.props.onChange(this.state.value, this.props.name, !res)
    }else{
      this.props.onChange(this.state.value, this.props.name, !res)
    }

  }
  render(){
    return (
      <React.Fragment>
        <input type='text' name={this.props.name} value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} onBlur={this.onChangeCompleted} />
      </React.Fragment>
    )
  }
}
export class InputInteger extends React.Component{
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount(){
    const { name, value } = this.props
    this.onChange({target:{name, value}})
  }

  onChange(e){
    let {value, name} = e.target
    const {min, max} = this.props
    if(value < min) value = min
    if(value > max) value = max
    const isError = value < min || value > max
    this.props.onChange(value, name, isError)
  }

  render() {
    const { name, value, min, max} = this.props
    return(
      <React.Fragment>
        <input type="number" name={name} value={value} min={min} max={max} onChange={this.onChange} />
      </React.Fragment>
    )
  }
}
export class Enum extends React.Component {
  componentWillMount(){
    const { name, value } = this.props
    this.props.onChange(value, name, false) 
  }
  render() {
    const { name, value, values } = this.props

    let valueObj = {}

    const options = values.map((val, i)=>{
      if(value === val) {
        valueObj = {
          value: value,
          label: value
        }
      }
      return {
        value: val,
        label: val
      }
    })    

    return (
      <React.Fragment>
        <Select
          value={ valueObj }
          //defaultValue={ value }
          onChange={ (value)=>{this.props.onChange(value.value, name, false)} }
          options={ options }
        />
      </React.Fragment>
    )
  }
}


export class InputCheckbox extends React.Component{
  render(){
    return (
      <div>
        { this.props.label ? <label>{this.props.label}</label> : null }
        <input type="checkbox" name={this.props.name} checked={this.props.value} onChange={(event)=>this.props.onChange(event.target.checked)} />
      </div>
    )
  }
}