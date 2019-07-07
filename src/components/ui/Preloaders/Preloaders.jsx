import React from "react";

import './Preloaders.sass';

export class Preloader extends React.Component{
  render(){
    return (
      <div className="preloader">
        <p>Идет подключение</p> 
        <i className="fa fa-spinner fa-spin fa-4x"></i>
      </div>
    )
  }
}