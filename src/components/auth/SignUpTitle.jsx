import React from "react";
import { SimpleLink as Link } from "../ui/Links/Links";

export class SignUpTitle extends React.Component{
  render(){
    return (
      <div className="auth-title signup-title">
        <h1>Регистрация</h1>
        <h3>После прохождения регистрации, Вы сможете войти в систему и начать добавлять устройства. Если у Вас уже есть аккаунт, то можете <Link to="/auth/signIn">войти</Link></h3>
      </div>
    )
  }
}