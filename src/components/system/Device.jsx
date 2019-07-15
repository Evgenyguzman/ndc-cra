import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Button } from "../ui/Buttons/Buttons";
import { ItemsContainer } from "../../containers/SystemContainers";
import { SettingsModal, SettingsForm } from "../device/SettingsModal";
import { SimpleLink } from "../ui/Links/Links";
import { Form } from "../ui/Form/Form";

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
    const {devices, items, deviceSettings, systemInfo} = this.props.system
    const {id} = this.props

    const device = devices.get(id)

    // console.log(systemInfo.dictionary.words)

    // redirect to system if no deice with such id
    if(!device || items.size === 0) return null
    // console.log(device)
    // console.log(items)
  
    const schema = deviceSettings[device.type]

    const parameters = device.items.map(itemId => {
      return items.get(itemId)
    })
    // console.log(parameters)

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
              <Form fields={[{type: 'text', name: 'name'}]} values={{name: device.name}} autoconfirm={true}  onConfirm={({data})=>this.props.onChange({'device-id': device.id, ...data})} />
              <h3>{device.id}</h3>
              <h3>{device.type}</h3>
              <b>{device.online === true ? 'Online' : 'Было онлайн' + device['last-online']}</b>
              <Button onClick={()=>this.props.onRemove(device.id, token)}>Удалить</Button>
            </div>
            <SettingsModal type="device-id" id={device.id} settings={settings} schema={schema} onChange={this.props.onChange} />
          </SimpleCard>
          
          <ItemsContainer parameters={parameters} link={ItemLink} deleteBtn={DeleteBtn} deviceId={device.id} />
          {/* <SimpleCard>
            <h2>Графики</h2>
            <Tabs charts={charts} />
          </SimpleCard> */}
        </div>
      </div>
    )
  }
}

class ItemLink extends React.Component{
  render(){
    const { id } = this.props
    return(
      <React.Fragment>
        <SimpleLink to={'/item/' + id}>Больше</SimpleLink>
      </React.Fragment>
    )
  }
}

class DeleteBtn extends React.Component{
  render(){
    const { itemId, deviceId, onRemove } = this.props
    return(
      <React.Fragment>
        <button onClick={()=>onRemove(itemId, deviceId)}>Delete</button>
      </React.Fragment>
    )
  }
}