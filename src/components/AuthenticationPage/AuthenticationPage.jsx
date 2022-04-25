import React, { Component } from "react";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";

import "./AuthenticationPage.scss";

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: false,
    };
  }

  toggleState = () => {
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
      </main>
    );
  }
}

export default React.memo(AuthenticationPage);