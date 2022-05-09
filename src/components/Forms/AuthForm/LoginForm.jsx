import React from 'react';
import { logInWithEmail } from '../../../API/authentication';
import {
  composeValidators,
  emailFormat,
  required,
} from '../../../utils/formValidate';
import LoadingButton from '../../LoadingButton/LoadingButton';
import withRouter from '../../HOC/withRouter';
import InputField from '../../InputField/InputField';
import './Form.scss';
import { Link } from 'react-router-dom';
import Form from '../Form';

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      email: {},
      password: {},
    };

    this.validators = {
      email: composeValidators(required, emailFormat),
      password: required,
    };
  }

  handleSubmit = this.handleSubmitTemplate(() => {
    const { email, password } = this.state;
    return logInWithEmail(email.value, password.value);
  });

  render() {
    const { email, password, formError, isInvalidForm } = this.state;
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <InputField
            onValidate={this.onValidateInput}
            type='email'
            name='email'
            label='Email'
            placeholder='example@abc.xyz'
            error={email.error}
            onChange={this.onChangeForm}
          />

          <InputField
            onValidate={this.onValidateInput}
            type='password'
            name='password'
            label='Password'
            placeholder='Type your password'
            error={password.error}
            onChange={this.onChangeForm}
          />
          {formError && <p className='formError'>{formError}</p>}
          <LoadingButton
            className='btnLogin'
            handleOnClick={this.handleSubmit}
            type='submit'
            text='Login'
            disabled={isInvalidForm}
          />
          <hr />
          <p>
            Don't have an account?{' '}
            <Link to='/authentication/signup'>Sign up</Link>
          </p>
        </form>
      </>
    );
  }
}

export default withRouter(LoginForm);
