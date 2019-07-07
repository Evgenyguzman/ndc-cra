import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Button } from "../ui/Buttons/Buttons";
import { Input } from "../ui/Inputs/Inputs";
import { SettingsModal, SettingsForm } from "../device/SettingsModal";
import { SimpleLink } from "../ui/Links/Links";

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
    const {items} = this.props.system
    const {id} = this.props
    const item = items.get(id)

    // // redirect to system if no deice with such id
    if(!item) return null

    const settings = item.settings

    return (
      <div>
        <div>
          <SimpleCard>
            <div className="item-title"> 
              <h1>{item.name}</h1>
              <SimpleLink to={"/device/" + item['device-id']}>{item['device-id']}</SimpleLink>
              <Input data={{type:'text',name:'name'}} value={item.name} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />
              <h3>{item.id}</h3>
              <h3>{item.type}</h3>
              
              <Input data={{type:'text',name:'data-type'}} value={item['dataType']} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />
              <Input data={{type:'text',name:'storage-range-time'}} value={item['storage-range-time']} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />
              <Input data={{type:'enum',name:'access',values:['read','read-write','write']}} value={item.access} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />
      
              <Input data={{type:'text',name:'value'}} value={item.value} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />
              <Input data={{type:'text',name:'data'}} value={item.data} onChange={(val, name)=>{this.props.onChange({[name]: val, 'item-id': item.id})}} />

              <Button onClick={()=>this.props.onRemove(item.id)}>Удалить</Button>
            </div>
            <SettingsModal>
              <SettingsForm type="item-id" id={item.id} settings={settings} onChange={this.props.onChange} />
            </SettingsModal>
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