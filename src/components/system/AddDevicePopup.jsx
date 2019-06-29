import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Steps } from "../ui/Steps/Steps";
import { Button } from "../ui/Buttons/Buttons";
import { ChooseDeviceSlider } from "../ui/Sliders/Sliders";
import WsCloudService from "../../services/WsCloudService";

export class AddDevicePopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: '',
      type: '',
      name: '',
      settings: []
    }
    this.onClose = this.onClose.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onAddName = this.onAddName.bind(this)
  }
  onClose(){
    // this.props.onClose()
    this.props.history.push('/system')
  }
  onChange(name, value){
    console.log(name, value)
    this.setState({[name]: value})
  }
  onAdd(){
    const {id, type, name, settings} = this.state
    this.props.onAddDevice({id, type, name, settings})
  }
  onAddName(){
    this.onClose()
  }
  render(){

    const componentsArr = [ChooseDevice, EnterSettings, ConfirmData, ChooseName]

    return (
      <div className="add-device-popup">
        <div>
          <SimpleCard>
            <Button onClick={this.onClose}>Закрыть</Button>
            <Steps steps={componentsArr} onChange={this.onChange} onAdd={this.onAdd} onAddName={this.onAddName} state={this.state} deviceSettings={this.props.deviceSettings} />
          </SimpleCard>
        </div>
      </div>
    )
  }
}

// need to get devices arr from service
const deviceTypes = [
  {
    id: 'modbus',
    name: 'Modbus',
    description: 'Устройство Modbus TCP',
    img: 'kv-006.png'
  },
  {
    id: 'lorawan',
    name: 'Lorawan',
    description: 'Устройство LoRaWan',
    img: 'kv-006.png'
  }
]
class ChooseDevice extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div>
        <h3>Выберите устройство</h3>
        <div className="choose-device-slider">
          <ChooseDeviceSlider slides={deviceTypes} value={this.props.state.type} component={ChooseDeviceItem} onChange={value=>this.props.onChange("type", value)} />
        </div>
      </div>
    )
  }  
}
class ChooseDeviceItem extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div className='choose-device-content'>
        <img src={"/img/"+this.props.img} alt=""/>
        <h5>{this.props.name}</h5>
        <p>{this.props.description}</p>
        <input type="radio" name="device-id" checked={this.props.value===this.props.id} onChange={e=>this.props.onChange(this.props.id)}/>
      </div>
    )
  }
}

class EnterSettings extends React.Component{
  constructor(props){
    super(props)
    if(!props.deviceSettings || !props.state.type) return
    const deviceSettings = props.deviceSettings[props.state.type]
    this.state = {}
    deviceSettings.forEach(set => {
      this.state[set.name] = ''
    })
    this.onChangeSettings = this.onChangeSettings.bind(this)
  }

  onChangeSettings(e){
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.onChange("settings", this.state)
    })
  }

  render(){
    console.log(this.props.deviceSettings)
    // change settings name id
    if(!this.props.deviceSettings || !this.props.state.type) return null
    const deviceSettings = this.props.deviceSettings[this.props.state.type]
    return(
      <React.Fragment>
        <div>
          <h3>Введите идентификатор</h3>
          <input type="text" name="id" value={this.props.state.id} onChange={e=>this.props.onChange("id", e.target.value)} />
        </div>
        <div>
          <h3>Введите имя</h3>
          <input type="text" name="name" value={this.props.state.name} onChange={e=>this.props.onChange("name", e.target.value)} />
        </div>
        <div>
          {
            deviceSettings.map((set, i)=>
              <React.Fragment key={i}>
                <h3>{set.name}</h3>
                <input type="text" name={set.name} value={this.state[set.name]} onChange={this.onChangeSettings}  />
              </React.Fragment>
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
    console.log('creating')
    // form data (device & parameters) via owencloudservice
  }
  render(){
    return(
      <div>
        <h3>Подтвердите</h3>
        <div><label>Устройство <span>{this.props.state.type}</span></label></div>
        <div><label>Идентификатор <span>{this.props.state.id}</span></label></div>
        <div><label>Имя <span>{this.props.state.name}</span></label></div>
        <Button onClick={this.props.onAdd}>Подтверждаю</Button>
      </div>
    )
  }  
}
class ChooseName extends React.Component{
  render(){
    return(
      <div>
        <h3>Успех</h3>
        <Button onClick={this.props.onAddName}>Готово</Button>
      </div>
    )
  }  
}