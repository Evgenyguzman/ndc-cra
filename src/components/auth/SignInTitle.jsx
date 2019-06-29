import React from "react";
import { SimpleLink as Link } from "../ui/Links/Links";

export class SignInTitle extends React.Component{
  render(){
    return (
      <div className="auth-title signin-title">
        <h1>Вход</h1>
        <h3>Введите данные своего аккаунта, а если он отсутствует, то <Link to="/auth/signUp">зарегистрируйтесь</Link></h3>
      </div>
    )
  }
}