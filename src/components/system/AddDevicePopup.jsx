import React from "react";
import { SimpleCard } from "../ui/Cards/Cards";
import { Steps } from "../ui/Steps/Steps";
import { Button } from "../ui/Buttons/Buttons";
import { ChooseDeviceSlider } from "../ui/Sliders/Sliders";
import { Input } from "../ui/Inputs/Inputs";
import { Form } from "../ui/Form/Form";

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
  }
  onClose(){
    // this.props.onClose()
    // this.props.history.push('/system')
    this.props.history.goBack()
  }
  onChange(value, name){
    this.setState({[name]: value}, ()=>{console.log(this.state)})
  }
  onAdd(){
    const {id, type, name, settings} = this.state
    return this.props.onAdd({id, type, name, settings})
  }
  render(){

    const componentsArr = [ChooseDevice, EnterSettings, ConfirmData]

    return (
      <div className="add-device-popup">
        <div>
          <SimpleCard>
            <Button onClick={this.onClose}>Закрыть</Button>
            <Steps steps={componentsArr} onChange={this.onChange} onAdd={this.onAdd} onClose={this.onClose} state={this.state} settings={this.props.settings} />
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
          <ChooseDeviceSlider slides={deviceTypes} value={this.props.state.type} component={ChooseDeviceItem} onChange={value=>this.props.onChange(value, 'type')} />
        </div>
      </div>
    )
  }  
}
class ChooseDeviceItem extends React.Component{
  render(){
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

// class EnterSettings extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {}
//     this.onChangeSettings = this.onChangeSettings.bind(this)
//   }

//   componentWillMount(){
//     if(!this.props.settings || !this.props.state.type) return
//     const settings = this.props.settings[this.props.state.type]
//     settings.forEach(set => {
//       this.setState({[set.name]: set['default-value']})
//     })
//   }

//   onChangeSettings(value, name){
//     console.log(this.state)
//     this.setState({
//       [name]: value
//     }, () => {
//       this.props.onChange(this.state, "settings")
//     })
//   }

//   render(){
//     // console.log(this.props.settings)
//     // change settings name id
//     if(!this.props.settings || !this.props.state.type) return null
//     const settings = this.props.settings[this.props.state.type]
//     console.log(settings)
//     return(
//       <React.Fragment>
//         <Input data={{type:'text',name:'id'}} value={this.props.state.id} onChange={this.props.onChange} />
//         <Input data={{type:'text',name:'name'}} value={this.props.state.name} onChange={this.props.onChange} />
//         <div>
//           {
//             settings.map((set, i)=>
//               <Input key={i} data={set} value={this.state[set.name]} onChange={this.onChangeSettings} />
//             )
//           }
//         </div>
//       </React.Fragment>
//     )
//   }  
// }

class EnterSettings extends React.Component{
  constructor(props){
    super(props)
    this.onReady = this.onReady.bind(this)
  }

  onReady(data){
    console.log("Ready: ", data)
    this.props.onChange(data.id, "id")
    this.props.onChange(data.name, "name")
    this.props.onChange(data.settings, "settings")
  }

  render(){
    // console.log(this.props.settings)
    // change settings name id
    if(!this.props.settings || !this.props.state.type) return null
    const settings = this.props.settings[this.props.state.type]
    // console.log(settings)

    const schema = [
      {type:'text',name:'id'},
      {type:'text',name:'name',minLength:1}
    ]
    const values = {}

    const forms = [{
      name: 'settings',
      fields: settings, 
      values: {},
      autoconfirm: true
    }]

    return(
      <React.Fragment>
        <div>
          <Form fields={schema} values={values} forms={forms} autoconfirm={true} onConfirm={({data})=>this.onReady(data)} />
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
        <div><label>Устройство <span>{this.props.state.type}</span></label></div>
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