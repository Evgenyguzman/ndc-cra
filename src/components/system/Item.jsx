import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Button } from "../ui/Buttons/Buttons";
import { Input } from "../ui/Inputs/Inputs";
import { SettingsModal, SettingsForm } from "../device/SettingsModal";
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
    // // redirect to system if no deice with such id
    if(!item || Object.keys(itemSettings).length === 0) return null
    const device = devices.get(item['device-id'])
    const isOnline = device ? device.online : false

    const common = itemSettings.common
    const protocol = itemSettings.protocol[item.type]
    const settings = item.settings

    return (
      <div>
        <div>
          <SimpleCard>
            <div className="item-title"> 
              <h1>{item.name}</h1>
              {isOnline ? 'Online' : 'Offline'}
              <SimpleLink to={"/device/" + item['device-id']}>{item['device-id']}</SimpleLink>
              <Form fields={[{type: 'text', name: 'name', minLength: 1}]} values={{'name': item.name}} autoconfirm={true} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
              <h3>{item.id}</h3>
              <h3>{item.type}</h3>
              {
                common.map((set, i)=>
                  <Form key={i} fields={[set]} values={{[set.name]: item[set.name]}} autoconfirm={true} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
                )
              }
              <Form fields={[{type: 'text', name: 'value'}]} values={{'value': item.value}} autoconfirm={false} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />
              <Form fields={[{type: 'text', name: 'data'}]} values={{'data': item.data}} autoconfirm={false} onConfirm={({data})=>this.props.onChange({'item-id': item.id, ...data})} />

              <Button onClick={()=>this.props.onRemove(item.id)}>Удалить</Button>
            </div>
            <SettingsModal>
              <SettingsForm type="item-id" id={item.id} settings={settings} schema={protocol} onChange={this.props.onChange} />
            </SettingsModal>
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