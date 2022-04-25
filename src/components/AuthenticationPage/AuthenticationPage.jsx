import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import withFirebaseAuth from "../HOC/withFirebaseAuth";

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
      (this.props.user)?
      <Navigate to='/'></Navigate>
      :<main>
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

export default withFirebaseAuth(React.memo(AuthenticationPage));