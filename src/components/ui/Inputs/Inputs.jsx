import React from "react";

import Select from 'react-select'

import './Inputs.sass';

export class Input extends React.Component{
  render(){
    const {data} = this.props
    // use hoc
    if(data.type === 'boolean'){
      // switch
      return withLabel(<Switch name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name)
    }else if(data.type === 'text'){
      // input type text
      return withLabel(<InputText type="text" name={data.name} value={this.props.value} onChange={this.props.onChange} />, data.name)
    }else if(data.type === 'integer'){
      // input type number
      return withLabel(<InputNumber name={data.name} value={this.props.value} min={data.min} max={data.max} onChange={this.props.onChange} />, data.name)
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

class InputText extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value
    }
    this.onChangeCompleted = this.onChangeCompleted.bind(this)
  }
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  onChangeCompleted(){
    // validate
    console.log()
    this.props.onChange(this.state.value, this.props.name)
  }
  render(){
    return (
      <React.Fragment>
        <input type={(this.props.type ? this.props.type : 'text')} name={this.props.name} value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} onBlur={this.onChangeCompleted} />
      </React.Fragment>
    )
  }
}

class Switch extends React.Component{
  render() {
    const { name, value } = this.props
    const isChecked = value === '1'
    return (
      <React.Fragment>
        <label className="switch">
          <input type="checkbox" name={name} checked={isChecked} onChange={(e) => {this.props.onChange((e.target.checked) ? '1' : '0', name)}} />
          <span className="slider round"></span>
        </label>
      </React.Fragment>
    )
  }
}
class InputIP extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value
    }
    this.onChangeCompleted = this.onChangeCompleted.bind(this)
  }
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  onChangeCompleted(){
    // validate
    console.log()
    this.props.onChange(this.state.value, this.props.name)
  }
  render(){
    return (
      <React.Fragment>
        <input type='text' name={this.props.name} value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} onBlur={this.onChangeCompleted} />
      </React.Fragment>
    )
  }
}
class InputNumber extends React.Component{
  render() {
    const { name, value, min, max} = this.props
    return(
      <React.Fragment>
        <input type="number" name={name} value={value} min={min} max={max} onChange={(e)=>{this.props.onChange(e.target.value, e.target.name)}} />
      </React.Fragment>
    )
  }
}
class Enum extends React.Component {
  render() {
    const { name, value, values } = this.props

    console.log(value)

    const options = values.map((value, i)=>{
      return {
        value: "option"+i,
        label: value
      }
    })    

    return (
      <React.Fragment>
        <Select
          value={ value }
          onChange={ (value)=>{this.props.onChange(value.label, name)} }
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