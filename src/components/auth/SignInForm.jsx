import React from "react";
// import { Input } from "../ui/Inputs/Inputs";
// import { Button } from "../ui/Buttons/Buttons";
import WsCloudService from "../../services/WsCloudService";
import { Form } from "../ui/Form/Form";

export class SignInForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      login: '',
      password: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  render(){
    const schema = [
      {type:'text', name: 'email', minLength:1},
      {type:'password', name: 'password', minLength:1},
      // {type:'switch', name: 'acceptAgreement'}
    ]
    return (
      <form onSubmit={(e)=>{
        e.preventDefault(); 
        this.onSubmit()
      }}>
        <div>
          <h3>Sign In</h3>
          <div>
            <Form fields={schema} autoconfirm={false} onConfirm={({data})=>data} />
            {/* <Button>Next</Button> */}
          </div>
        </div>
      </form>
    )
  }
  onSubmit(){
    const { login, password } = this.state
    WsCloudService.getToken(login, password).then(
      res => {
        console.log(res)
        if(res.token) {
          this.props.onSignedIn(login, password, res.token, res.name, res.surname)
          this.props.onSuccess()
        }
      }
    )
  }
}