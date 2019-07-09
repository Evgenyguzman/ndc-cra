import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";

export class ItemCards extends React.Component{
  render(){
    return(
      <React.Fragment>
        {
          this.props.parameters.map((item, i)=>
            <SimpleCard key={i}>
              <h2>{item.name}</h2>
              <Item item={item} />
            </SimpleCard>
          )
        }
      </React.Fragment>
    )
  }
}

class Item extends React.Component{
  render(){
    const { type, access } = this.props.item
    // bytemask!
    if(type==='boolean'){
      if(access==='read'){
        // return disabled switch
        return <DisabledSwitch item={this.props.item} />
      }else if(access==='read-write'){
        // return switch
        return <Switch item={this.props.item} />
      }else if(access==='write'){
        // return trigger switch
        return <TriggerSwitch item={this.props.item} />
      }
    }else if(type==='float32'){
      if(access==='read'){

      }else if(access==='read-write'){

      }else if(access==='write'){

      }
    }
    return null
  }
}

export class Switch extends React.Component {
  render() {
    const { item } = this.props
    const isChecked = item.value === 'on'
    return (
      <div className="switch-item">
        <label className="title">{ item.name }</label>
        <label className="switch">
          <input type="checkbox" name={item.id} id={item.id} checked={isChecked} onChange={(event) => {this.props.onChangeValue({itemId: item.id, value: (event.target.checked) ? 'on' : 'off' })}} />
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}
export class DisabledSwitch extends React.Component {
  render() {
    const { item } = this.props
    const isChecked = item.value === 'on'
    return (
      <div className="switch-item">
        <label className="title">{ item.name }</label>
        <label className="switch">
          <input disabled type="checkbox" name={item.id} id={item.id} checked={isChecked} onChange={(event) => {this.props.onChangeValue({itemId: item.id, value: (event.target.checked) ? 'on' : 'off' })}} />
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}export class TriggerSwitch extends React.Component {
  render() {
    const { item } = this.props
    return (
      <div className="switch-item">
        <label className="title">{ item.name }</label>
        <label className="switch">
          <input type="checkbox" name={item.id} id={item.id} checked={false} onChange={(event) => {this.props.onChangeValue({itemId: item.id, value: (event.target.checked) ? 'on' : 'off' }) }} />
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}