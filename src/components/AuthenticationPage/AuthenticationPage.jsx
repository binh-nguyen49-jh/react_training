import React, { Component } from "react";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import waves from "./waves.svg";

import "./AuthenticationPage.scss";

export default class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: false,
    };
  }

  toggleState() {
    this.setState((prevState) => ({
      isSigningUp: !prevState.isSigningUp,
    }));
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="logo">
            <img src="journeyh.png" alt="" />
            <h1>journey horizon</h1>
          </div>
          <div className="form-container">
            {this.state.isSigningUp ? (
              <SignUpForm toggleState={this.toggleState} />
            ) : (
              <LoginForm toggleState={this.toggleState} />
            )}
          </div>
        </div>
        <div className="background">
          <img src={waves} alt="waves background" />
          <div className="background__water"></div>
        </div>
      </main>
    );
  }
}
