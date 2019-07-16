import React from "react";

import Modal from 'react-modal';

import './Modals.sass';

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

export class SimpleModal extends React.Component{
  render(){
    return (
      <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="Modal"
        >
        {this.props.children}
      </Modal>
    )
  }
}