import React from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './sass/AuthScreen.sass';
import { SignInTitle } from "../../components/auth/SignInTitle";
import { SignUpTitle } from "../../components/auth/SignUpTitle";
import { SignUpForm } from "../../components/auth/SignUpForm";
import { AuthCard } from "../../components/auth/AuthCard";
import { SignInFormContainer } from "../../containers/AuthContainers";

export class AuthScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = { redirectToReferrer: false }
  }
  render(){
    let { from } = this.props.location.state || { from: { pathname: "/" } }
    let { redirectToReferrer } = this.state
    const isActive = (this.props.location.pathname === '/auth/signUp') ? 'active' : ''
    if (redirectToReferrer) return <Redirect to={from} />
    return (
      <div className="auth-screen">
        <Route
          exact
          path="/auth"
          render={() => <Redirect to="/auth/signIn" />}
        />
        <div className="auth-title-wrapper">
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.key}
              classNames="fade"
              timeout={300}
            >
              <Switch location={this.props.location}>
                <Route exact path="/auth/signIn" render={() => <SignInTitle />} />
                <Route exact path="/auth/signUp" render={() => <SignUpTitle />} />
                {/* <Route render={() => <div>Not Found</div>} /> */}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className={"auth-form " + isActive}>
          <div>
          {/* <TransitionGroup> */}
            {/* <CSSTransition
              key={this.props.location.key}
              classNames="fade"
              timeout={300}
            > */}
              <AuthCard classNames="auth-card">
                <Switch location={this.props.location}>
                  <Route exact path="/auth/signIn" render={() => <SignInFormContainer onSuccess={()=>{this.setState({ redirectToReferrer: true });}} />} />
                  <Route exact path="/auth/signUp" render={() => <SignUpForm onSuccess={()=>{this.setState({ redirectToReferrer: true });}} />} />
                  {/* <Route render={() => <div>Not Found</div>} /> */}
                </Switch>
              </AuthCard>
            {/* </CSSTransition> */}
          {/* </TransitionGroup> */}
          </div>
        </div>
        
      </div>
    )
  }
}