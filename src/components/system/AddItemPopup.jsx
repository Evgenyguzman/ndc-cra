import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Steps } from "../ui/Steps/Steps";
import { Button } from "../ui/Buttons/Buttons";
import { Input } from "../ui/Inputs/Inputs";

export class AddItemPopup extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      'id': '',
      'device-id': props.deviceId,
      'name': 'Тэг',
      'access': 'read',
      'settings': [],
      'data-type': 'float-32',
      'storage-range-time': 900
    }
    
    this.onClose = this.onClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  componentWillMount(){
    const device = this.props.devices.get(this.props.deviceId)
    if(device){
      this.setState({type: device.type})
    }
  }
  componentWillReceiveProps(nextProps){
    // console.log(this.props.devices, )
    if(this.props.devices.size === 0 && nextProps.devices.size > 0){
      const device = nextProps.devices.get(nextProps.deviceId)
      this.setState({
        type: device.type
      })
    }
  }

  onClose(){
    // this.props.onClose()
    this.props.history.goBack()
  }
  onChange(value, name){
    console.log(name, value)
    this.setState({[name]: value}, ()=>{console.log(this.state)})
  }
  onAdd(){
    // сократить запись
    const {id, type, name, settings, access} = this.state
    const deviceId = this.state['device-id']
    const dataType = this.state['data-type']
    const storageRangeTime = this.state['storage-range-time']
    return this.props.onAdd({id, type, name, settings, deviceId, dataType, storageRangeTime, access})
  }
  render(){
    const device = this.props.devices.get(this.props.deviceId)
    if(!device || Object.keys(this.props.settings).length === 0) return null
    const componentsArr = [EnterSettings, ConfirmData]
    return (
      <div className="add-item-popup">
        <div>
          <SimpleCard>
            <Button onClick={this.onClose}>Закрыть</Button>
            <Steps steps={componentsArr} onChange={this.onChange} onAdd={this.onAdd} state={this.state} settings={this.props.settings} />
          </SimpleCard>
        </div>
      </div>
    )
  }
}

class EnterSettings extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
    this.onChangeSettings = this.onChangeSettings.bind(this)
  }

  componentWillMount(){
    console.log(this.props.settings, this.props.state.type)
    const settings = this.props.settings[this.props.state.type]
    
    var result = settings.reduce(function(sum, set) {
      sum[set.name] = set['default-value']
      return sum
    }, {})

    this.setState(result, ()=> this.props.onChange(this.state, 'settings') )
  }

  onChangeSettings(value, name){
    this.setState({
      [name]: value
    }, () => {
      this.props.onChange(this.state, 'settings')
    })
  }

  render(){
    let { common, protocol } = this.props.settings
    if(Object.keys(protocol).length === 0 || !this.props.state.type) return null
    protocol = protocol[this.props.state.type]

    console.log(common, protocol)

    return(
      <React.Fragment>
        <Input data={{type:'text',name:'id'}} value={this.props.state.id} onChange={this.props.onChange} />
        <Input data={{type:'text',name:'name'}} value={this.props.state.name} onChange={this.props.onChange} />
        {
          common.map((set, i)=>
            <Input key={i} data={set} value={this.props.state[set.name]} onChange={this.props.onChange} />
          )
        }
        {/* <Input data={{type:'text',name:'dataType'}} value={this.props.state.dataType} onChange={this.props.onChange} />
        <Input data={{type:'text',name:'storageRangeTime'}} value={this.props.state.storageRangeTime} onChange={this.props.onChange} />
        <Input data={{type:'enum',name:'access',values:['read','read-write','write']}} value={this.props.state.access} onChange={this.props.onChange} /> */}
        <div>
          {
            protocol.map((set, i)=>
              <Input key={i} data={set} value={this.state[set.name]} onChange={this.onChangeSettings} />
            )
          }
        </div>
      </React.Fragment>
    )
  }  
}
class ConfirmData extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      result: null
    }
    this.onAdd = this.onAdd.bind(this)
  }
  async onAdd(){
    const result = await this.props.onAdd()
    console.log(result)
    this.setState({result})
  }

  confirmArea(){
    return(
      <div>
        <h3>Подтвердите</h3>
        <div><label>Идентификатор <span>{this.props.state.id}</span></label></div>
        <div><label>Имя <span>{this.props.state.name}</span></label></div>
        <Button onClick={this.onAdd}>Подтверждаю</Button>
      </div>
    )
  }
  successMessage = () => this.message({message: 'Success', className: 'success'})
  errorMessage = () => this.message({message: 'Error', className: 'error'})
  message = ({message, className}) => <div className={className}><h3>{message}</h3><Button onClick={this.props.onClose}>Закрыть</Button></div>

  render(){
    switch (this.state.result) {
      case null: return this.confirmArea()
      case true: return this.successMessage()
      case false: return this.errorMessage()
      default: return null
    }
  }  
}