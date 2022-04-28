import React from 'react';
import { registerWithEmail } from '../../API/authentication';
import {
  composeValidators,
  maxLength,
  minLength,
  required,
} from '../../utils/formValidate';
import { POSITIONS } from '../../config/constants';
import DropdownField from '../DropdownField/DropdownField';
import LoadingButton from '../LoadingButton/LoadingButton';
import withRouter from '../HOC/withRouter';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';
import Form from './Form';

class SignUpForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      email: {},
      password: {},
      name: {},
      position: {},
    };

    this.validators = {
      email: required,
      password: composeValidators(required, minLength(8), maxLength(10)),
      name: required,
      position: required,
    };
  }

  handleSubmit = this.handleSubmitTemplate(() => {
    const registerInfo = {};
    for (let field in this.validators) {
      registerInfo[field] = this.state[field].value;
    }
    return registerWithEmail(registerInfo);
  });

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <InputField
            onValidate={this.onValidateInput}
            type='name'
            name='name'
            label='Name'
            placeholder='Type your name'
            error={this.state.name.error}
            onChange={this.onChangeForm}
          />

          <InputField
            onValidate={this.onValidateInput}
            type='email'
            name='email'
            label='Email'
            placeholder='example@abc.xyz'
            error={this.state.email.error}
            onChange={this.onChangeForm}
          />

          <InputField
            onValidate={this.onValidateInput}
            type='password'
            name='password'
            label='Password'
            placeholder='Type your password'
            error={this.state.password.error}
            onChange={this.onChangeForm}
          />

          <DropdownField
            onValidate={this.onValidateInput}
            name='position'
            label='Position'
            placeholder='Select your position'
            options={POSITIONS}
            error={this.state.position.error}
            onChange={this.onChangeForm}
          />
          {this.state.formError && (
            <p className='formError'>{this.state.formError}</p>
          )}
          <LoadingButton
            className='btnSignUp'
            handleOnClick={this.handleSubmit}
            disabled={this.state.isSubmittable}
            text='Sign up'
            type='submit'
          />
          <hr />
          <p>
            Already have an account?{' '}
            <Link to='/authentication/login'>Log in</Link>
          </p>
        </form>
      </>
    );
  }
}

export default withRouter(React.memo(SignUpForm));
