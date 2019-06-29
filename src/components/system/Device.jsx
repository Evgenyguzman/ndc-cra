import React from "react";
import { Table } from "../device/Table";
import { Tabs } from "../device/Tabs";
import { SimpleCard } from "../ui/Cards/Cards";
import { Button } from "../ui/Buttons/Buttons";

export class Device extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      config: null,
      parameterIds: null,
      chartsIds: null
    }
  }
  render(){
    const {token} = this.props.user
    const {devices, items} = this.props.system
    const {id} = this.props

    const device = devices.get(id)
    if(!device || items.size === 0) return null
    console.log(device)
    console.log(items)
  
    const parameters = device.items.map(itemId => {
      return items.get(itemId)
    })
    console.log(parameters)

    // if(!device || !device.parameters || !this.state.parameterIds || !this.state.chartsIds) return null

    // const parameters = device.parameters.filter((param)=>{return this.state.parameterIds.indexOf(param.code) !== -1 }).map(param=>{param.value=param.value||0; return param})
    // const charts = this.state.chartsIds.map(chartIds => device.parameters.filter(param => chartIds.indexOf(param.code) !== -1).map(param=>param.value))
    // console.log(charts)
    // console.log(this.state)

    const settings = device.settings

    return (
      <div>
        <div>
          <SimpleCard>
            <div className="device-title"> 
              <h1>{device.name}</h1>
              <h3>{device.id}</h3>
              <h3>{device.type}</h3>
              <b>{device.online === true ? 'Online' : 'Было онлайн' + device['last-online']}</b>
              <Button onClick={()=>this.props.onRemove(device.id, token)}>Удалить</Button>
            </div>
            <div className="device-settings">
              {Object.keys(settings).map((key) =>
                <React.Fragment key={key}>
                  <div>
                    <label>{key}</label>
                    <h3 htmlFor="">{settings[key]}</h3>
                  </div>
                </React.Fragment>
              )}
            </div>
          </SimpleCard>
          <SimpleCard>
            <h2>Параметры</h2>
            <Table parameters={parameters} popup={ItemSettingsPopup} />
          </SimpleCard>
          {/* <SimpleCard>
            <h2>Графики</h2>
            <Tabs charts={charts} />
          </SimpleCard> */}
        </div>
      </div>
    )
  }
}

class ItemSettingsPopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isOpened: false
    }
  }
  render(){
    const { isOpened } = this.state
    const { settings } = this.props
    return(
      <React.Fragment>
        <button onClick={()=>this.setState({isOpened: !isOpened})}>Toggle</button>
        {
          isOpened
          ?
            <div className="absolute-card" onClick={()=>this.setState({isOpened: !isOpened})}>
              <SimpleCard>
                <div className="flex-card-inner">
                  {Object.keys(settings).map((key) => 
                    <div key={key}>
                      <label>{key}</label>
                      <h3>{settings[key]}</h3>
                    </div>
                  )}
                </div>
              </SimpleCard>
            </div>
          :
            null
        }
      </React.Fragment>
    )
  }
}