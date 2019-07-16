import React from "react";
import { Form } from "../ui/Form/Form";
// import { Input, InputCheckbox } from "../ui/Inputs/Inputs";
// import { Button } from "../ui/Buttons/Buttons";

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
    // const {requestId, email, password, verifyCode, captchaBase64, name, surname, acceptAgreement} = this.state
    
    const schema = [
      {type:'text', name: 'email', minLength:1},
      {type:'password', name: 'password', minLength:1},
      // {type:'switch', name: 'acceptAgreement'}
    ]
    
    return (
      <div className="form">
        <div>
          <h3>Sign Up</h3>
          <div>
            <Form fields={schema} autoconfirm={false} onConfirm={({data})=>data} />
            {/* <Button onClick={this.onSubmit}>Next</Button> */}
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