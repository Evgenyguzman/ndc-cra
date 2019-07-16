import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { SimpleCard } from "../ui/Cards/Cards";
import { ButtonWithPrompt } from "../ui/Buttons/Buttons";
import { SettingsModal } from "../device/SettingsModal";
import { SimpleLink } from "../ui/Links/Links";
import { ChartContainer } from "../../containers/SystemContainers";
import { Form } from "../ui/Form/Form";

export class Item extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      config: null,
      parameterIds: null,
      chartsIds: null
    }
  }
  render(){
    const {devices, items, itemSettings} = this.props.system
    const {id} = this.props
    const item = items.get(id)
    // // redirect to system if no device with such id
    if(!item || Object.keys(itemSettings).length === 0) return null
    const device = devices.get(item['device-id'])
    const isOnline = device ? device.online : false
    const isOnlineClass = isOnline ? 'green' : 'red'

    console.log(item)
    const isDisabled = item.access === 'read'
    const isWriteOnly = item.access === 'write'

    const common = itemSettings.common
    const protocol = itemSettings.protocol[item.type]
    const settings = item.settings

    return (
      <div>
        <div>
          <SimpleCard>
            <div className="top-btn top-left-btn">
              <SimpleLink to={"/device/" + item['device-id']}>
                <FontAwesomeIcon icon={faAngleLeft} color='white' size="3x" />
              </SimpleLink>
              <SimpleLink to={"/device/" + item['device-id']}>
                {device.name}
              </SimpleLink>
            </div>
            <div className={"top-btn top-right-btn " + isOnlineClass}>
              <span>{isOnline ? 'В сети' : 'Не в сети'}</span>
            </div>
            <div className="item-title"> 
              <h1>{item.name} <span>(id: {item.id})</span> </h1>
              <Form fields={[{type: 'text', name: 'name', minLength: 1}]} values={{'name': item.name}} autoconfirm={true} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
              {
                common.map((set, i)=>
                  <Form key={i} fields={[set]} values={{[set.name]: item[set.name]}} autoconfirm={true} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
                )
              }
              {
                !isDisabled
                ?
                  <React.Fragment>
                    <Form fields={[{type: 'text', name: 'value', isDisabled, isWriteOnly}]} values={{'value': item.value}} autoconfirm={false} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
                    <Form fields={[{type: 'text', name: 'data', isDisabled, isWriteOnly}]} values={{'data': item.data}} autoconfirm={false} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
                  </React.Fragment>
                :
                  <React.Fragment>
                    <label>Значение: </label><h3>{item.value}</h3>
                    <label>Данные: </label><h3>{item.data}</h3>
                  </React.Fragment>
              }

            </div>
            <div className={"btm-btn btm-left-btn "}>
              <SettingsModal type="item-id" id={item.id} settingsType={item.type} settings={settings} schema={protocol} onChange={this.props.onChange} />
            </div>
            <div className={"btm-btn btm-right-btn "}>
              <ButtonWithPrompt onClick={()=>{
                this.props.onRemove(item.id)
              }}>Удалить</ButtonWithPrompt>
            </div>
          </SimpleCard>
          <SimpleCard>
            <h2>Графики</h2>
            <ChartContainer itemId={item.id} />
          </SimpleCard>
        </div>
      </div>
    )
  }
}