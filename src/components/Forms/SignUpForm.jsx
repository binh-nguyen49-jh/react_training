import React, { Component } from "react";
import { registerWithEmail } from "../../API/authentication";
import PositionAPI from "../../API/positionAPI";
import {
  composeValidators,
  maxLength,
  minLength,
  required,
} from "../../utils/formValidate";
import DropdownField from "../DropdownField/DropdownField";
import FormButton from "../FormButton/FormButton";
import withRouter from "../HOC/withRouter";
import InputField from "../InputField/InputField";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {},
      password: {},
      name: {},
      position: {},
      loginError: null,
      positions: [],
    };

    this.validators = {
      email: required,
      password: composeValidators(required, minLength(8), maxLength(10)),
      name: required,
      position: required,
    };
  }

  componentDidMount = async () => {
    try {
      const positions = await PositionAPI.getAllPosition();
      this.setState({
        positions: positions.map((position) => ({
          value: position.positionId,
          label: position.name,
        })),
      });
    } catch (error) {}
  };
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
    const registerInfo = {};
    let errorFlag = false;
    for (let field in this.validators) {
      registerInfo[field] = this.state[field].value;
      const error = this.onValidateInput(field, this.state[field].value);
      if (error) {
        errorFlag = true;
      }
    }
    if (errorFlag) {
      return;
    }
    try {
      const userProfile = await registerWithEmail(registerInfo);
      console.log(userProfile);
      this.props.toggleState();
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
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <InputField
            onValidate={this.onValidateInput}
            type="name"
            name="name"
            label="Name"
            placeholder="Type your name"
            error={this.state.name.error}
            onChange={this.onChangeForm}
          />

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

          <DropdownField
            onValidate={this.onValidateInput}
            name="position"
            label="Position"
            placeholder="Select your position"
            options={this.state.positions}
            error={this.state.position.error}
            onChange={this.onChangeForm}
          />
          {this.state.loginError && (
            <p className="form-error">{this.state.loginError}</p>
          )}
          <FormButton
            className="btn-signUp"
            handleOnClick={this.handleSubmit}
            text="Sign up"
          />
          <hr />
          <FormButton
            className="btn-login"
            handleOnClick={this.props.toggleState}
            type="submit"
            text="Login"
          />
        </form>
      </>
    );
  }
}

export default withRouter(React.memo(SignUpForm));
