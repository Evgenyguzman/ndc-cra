import React from "react";

import Modal from 'react-modal';

import { Button } from "../ui/Buttons/Buttons";
import { Input } from "../ui/Inputs/Inputs";
import { Form } from "../ui/Form/Form";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

export class SettingsModal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({isOpen: true});
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({isOpen: false});
  }

  render(){
    return( 
      <React.Fragment>
        <Button onClick={this.openModal}>Настройки</Button>
        <Modal
          isOpen={this.state.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Button onClick={this.closeModal}>close</Button>
          { this.props.children }
        </Modal>
      </React.Fragment>
    )
  }
}

// export class SettingsForm extends React.Component{

//   constructor(props){
//     super(props)
//     this.state = props.settings 
//     this.onSave = this.onSave.bind(this)
//     this.onChange = this.onChange.bind(this)
//   }

//   onSave() {
//     this.props.onChange({
//       'settings': this.state,
//       [this.props.type]: this.props.id
//     })
//   }

//   onChange(value, name) {
//     this.setState({
//       [name]: value
//     })
//   }

//   render(){
//     const settings = this.state
//     const { schema } = this.props
//     // console.log(schema, settings)
//     return(
//       <React.Fragment>
//         { this.props.children }
//         <div className="settings">
//           {schema.map((set, i)=>
//             <Input key={i} data={set} value={settings[set.name]} onChange={this.onChange} />
//           )}
//         </div>
//         <Button onClick={this.onSave}>save</Button>
//       </React.Fragment>
//     )
//   }

// }

export class SettingsForm extends React.Component{

  constructor(props){
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave(data) {
    console.log(data)
    this.props.onChange({
      'settings': data,
      [this.props.type]: this.props.id
    })
  }

  render(){
    const {settings, schema} = this.props
    // console.log(schema, settings)
    return(
      <React.Fragment>
        <Form fields={schema} values={settings} onConfirm={({data})=>this.onSave(data)} />
      </React.Fragment>
    )
  }

}