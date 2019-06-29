import React from "react";
import { InputText } from "../ui/Inputs";
import { Button } from "../ui/Buttons/Buttons";
import WsCloudService from "../../services/WsCloudService";

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
    return (
      <form onSubmit={(e)=>{
        e.preventDefault(); 
        this.onSubmit()
      }}>
        <div>
          <h3>Sign In</h3>
          <div>
            <InputText name="email" value={this.state.login} onChange={(login)=>this.setState({login})} />
            <InputText type="password" name="password" value={this.state.password} onChange={(password)=>this.setState({password})} />
            <Button>Next</Button>
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