import React, { Component } from "react";
import { logInWithEmail } from "../../API/authentication";
import {
  composeValidators,
  maxLength,
  minLength,
  required,
} from "../../utils/formValidate";
import LoadingButton from "../LoadingButton/LoadingButton";
import withRouter from "../HOC/withRouter";
import InputField from "../InputField/InputField";
import PropTypes from "prop-types";
import "./Form.scss";

class LoginForm extends Component {
  static propTypes = {
    toggleState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: {},
      password: {},
      loginError: null,
    };

    this.validators = {
      email: required,
      password: composeValidators(required, minLength(8), maxLength(10)),
    };
  }

  onChangeForm = (field, value, errorMessage) => {
    const newForm = this.state;
    newForm[field].value = value;
    newForm[field].error = errorMessage;
    this.setState(newForm);
  };

  onValidateInput = (field, value) => {
    const error = this.validators[field](value);
    const newForm = this.state;
    newForm[field].error = error;
    this.setState(newForm);
    return error;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let errorFlag = false;
    for (let field in this.validators) {
      const error = this.onValidateInput(field, this.state[field].value);
      if (error) {
        errorFlag = true;
      }
    }
    if (errorFlag) {
      return;
    }

    try {
      const userProfile = await logInWithEmail(
        this.state.email.value,
        this.state.password.value
      );
      console.log(userProfile);
    } catch (error) {
      if (!error.code) {
        this.setState({
          loginError: error.message,
        });
      } else {
        this.setState({
          loginError: error.code.split("/")[1].split("-").join(" "),
        });
      }
    }
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <InputField
            onValidate={this.onValidateInput}
            type="email"
            name="email"
            label="Email"
            placeholder="example@abc.xyz"
            error={this.state.email.error}
            onChange={this.onChangeForm}
          />

          <InputField
            onValidate={this.onValidateInput}
            type="password"
            name="password"
            label="Password"
            placeholder="Type your password"
            error={this.state.password.error}
            onChange={this.onChangeForm}
          />
          {this.state.loginError && (
            <p className="form-error">{this.state.loginError}</p>
          )}
          <LoadingButton
            className="btn-login"
            handleOnClick={this.handleSubmit}
            type="submit"
            text="Login"
          />
          <hr />
          <LoadingButton
            className="btn-signUp"
            handleOnClick={this.props.toggleState}
            text="Sign up"
          />
        </form>
      </>
    );
  }
}

export default withRouter(React.memo(LoginForm));
