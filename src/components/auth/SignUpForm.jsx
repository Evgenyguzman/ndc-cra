import React from "react";
import { InputText, InputCheckbox } from "../ui/Inputs";
import { Button } from "../ui/Buttons/Buttons";

export class SignUpForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      requestId: null,
      verifyCode: '',
      captchaBase64: '',
      email: '',
      password: '',
      password_confirm: '',
      name: '',
      surname: '',
      acceptAgreement: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  render(){
    const {requestId, email, password, verifyCode, captchaBase64, name, surname, acceptAgreement} = this.state
    return (
      <div className="form">
        <div>
          <h3>Sign Up</h3>
          <div>
            <InputText name="email" value={email} onChange={(email)=>this.setState({email})} />
            <InputText type="password" name="password" value={password} onChange={(password)=>this.setState({password})} />
            {(requestId)
              ?
                <div>
                  <InputText name="name" value={name} onChange={(name)=>this.setState({name})} />
                  <InputText name="surname" value={surname} onChange={(surname)=>this.setState({surname})} />
                  <div className="verifyCode">
                    <img src={captchaBase64} alt="verifyCode"/>
                    <InputText name="verifyCode" value={verifyCode} onChange={(verifyCode)=>this.setState({verifyCode})} />
                    <Button onClick={()=>this.setState({requestId: null})}>Update</Button>
                  </div>
                  <div>
                    <InputCheckbox name="acceptAgreement" value={acceptAgreement} onChange={(acceptAgreement)=>this.setState({acceptAgreement})} />
                  </div>
                </div>
              :
                ''
            }
            <Button onClick={this.onSubmit}>Next</Button>
          </div>
        </div>
      </div>
    )
  }

  onSubmit(){

    // const {email, password, name, surname, requestId, verifyCode, acceptAgreement} = this.state
    // if(requestId){
    //   WsCloudService.signUp(requestId, verifyCode, email, password, password, name, surname, acceptAgreement ? 1 : 0).then(
    //     res => {
    //       console.log(res)
    //     }
    //   )
    // }else{
    //   WsCloudService.initSignUp().then(
    //     res => {
    //       console.log(res)
    //       this.setState({requestId: res.requestId})
    //       this.setState({captchaBase64: res.captchaBase64})
    //     }
    //   )
    // }
    
  }

}