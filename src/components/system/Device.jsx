import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { ButtonWithPrompt } from "../ui/Buttons/Buttons";
import { ItemsContainer } from "../../containers/SystemContainers";
import { SettingsModal } from "../device/SettingsModal";
import { SimpleLink } from "../ui/Links/Links";
import { Form } from "../ui/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTrashAlt, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

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
    const {devices, items, deviceSettings} = this.props.system
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

    // if(!device || !device.parameters || !this.state.parameterIds || !this.state.chartsIds) return null

    // const parameters = device.parameters.filter((param)=>{return this.state.parameterIds.indexOf(param.code) !== -1 }).map(param=>{param.value=param.value||0; return param})
    // const charts = this.state.chartsIds.map(chartIds => device.parameters.filter(param => chartIds.indexOf(param.code) !== -1).map(param=>param.value))
    // console.log(charts)
    // console.log(this.state)

    const settings = device.settings

    const isOnline = device.online
    const isOnlineClass = isOnline ? 'green' : 'red'
    const isOnlineMsg = isOnline ? 'В сети' : device['last-online'] ? 'Было в сети ' + device['last-online'] : 'Не в сети'

    return (
      <div>
        <div>
          <SimpleCard>
            <div className="top-btn top-left-btn">
              <SimpleLink to={"/system"}>
                <FontAwesomeIcon icon={faAngleLeft} color='white' size="3x" />
              </SimpleLink>
              <SimpleLink to={"/system"}>
                Все устройства
              </SimpleLink>
            </div>
            <div className={"top-btn top-right-btn " + isOnlineClass}>
              <span>{isOnlineMsg}</span>
            </div>
            <div className="device-title"> 
              <h1>{device.name}</h1>
              <Form fields={[{type: 'text', name: 'name'}]} values={{name: device.name}} autoconfirm={true} onConfirm={({data})=>this.props.onChange({'device-id': device.id, ...data})} />
              <h3>{device.id}</h3>
            </div>
            <div className="btm-btn btm-left-btn">
              <SettingsModal type="device-id" settingsType={device.type} id={device.id} settings={settings} schema={schema} onChange={this.props.onChange} />
            </div>
            <div className="btm-btn btm-right-btn">
              <ButtonWithPrompt onClick={()=>this.props.onRemove(device.id, token)}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="#e74c3c" /> Удалить</ButtonWithPrompt>
            </div>
          </SimpleCard>
          
          <ItemsContainer parameters={parameters} link={ItemLink} deleteBtn={DeleteBtn} deviceId={device.id} addItemLink={this.props.addItemLink} />
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
        <SimpleLink to={'/item/' + id}><FontAwesomeIcon icon={faAngleRight} size="lg" color="#2ecc71" /></SimpleLink>
      </React.Fragment>
    )
  }
}

class DeleteBtn extends React.Component{
  render(){
    const { itemId, deviceId, onRemove } = this.props
    return(
      <React.Fragment>
        <ButtonWithPrompt onClick={()=>onRemove(itemId, deviceId)}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="#e74c3c" /></ButtonWithPrompt>
      </React.Fragment>
    )
  }
}