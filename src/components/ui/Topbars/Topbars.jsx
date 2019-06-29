import React from "react";
import { SimpleLink as Link } from "../Links/Links";

import './Topbars.sass';

export class Topbar extends React.Component{
  render(){
    return (
      <div className="topbar"> 
        <div className="logo">
          <img src={"/img/bergheim.svg"} alt=""/>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/auth">Вход/Регистрация</Link>
            </li>
            <li>
              <Link to="/system">Система</Link>
            </li>
            <li>
              <Link to="/">О проекте</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}