import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import React from 'react';
import RCSteps, { Step } from 'rc-steps';

import './Steps.sass';
import { Button } from '../Buttons/Buttons';

const description = 'Описание'

export class Steps extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      currentStep: 0
    }
  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 0? 0: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==0){
      return (
        <Button onClick={this._prev}>
        Назад
        </Button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <Button onClick={this._next}>
          Продолжить
        </Button>        
      )
    }
    return null;
  }

  render(){
    const {currentStep} = this.state
    let props = this.props
    // var props = JSON.parse(JSON.stringify(this.props))
    // props.currentStep = currentStep
    // props.previousButton = this.previousButton
    // props.nextButton = this.nextButton
    return(
      <div>
        <RCSteps labelPlacement="vertical" current={currentStep}>
          <Step title="Устройство" description={description} />
          <Step title="Заводской номер" description={description} />
          <Step title="Подтверждение" description={description} />
          <Step title="Результат" description={description} />
        </RCSteps>
        <div>
          {React.createElement(this.props.steps[currentStep], props)}
        </div>
        <div>
          {this.previousButton()}
          {this.nextButton()}
        </div>
      </div>
    )
  }
}