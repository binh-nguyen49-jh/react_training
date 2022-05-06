import { Component } from 'react';
import { AUTH_ERROR_MESSAGES } from '../../config/constants';
import './Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: null,
      isSubmittable: true,
    };
  }

  onChangeForm = (field, value, errorMessage) => {
    const newForm = {
      ...this.state,
      [field]: {
        value,
        error: errorMessage,
      },
    };
    this.setState(newForm);
    const isValidForm = this.checkValidateForm(false);
    this.onValidateInput(field, value, true);
    this.setState({
      isSubmittable: isValidForm,
    });
  };

  onValidateInput = (field, value, updateError = true) => {
    const error = this.validators[field](value);
    if (updateError) {
      const newForm = {
        ...this.state,
        [field]: {
          ...this.state[field],
          error,
        },
      };
      this.setState(newForm);
    }
    return error;
  };

  checkValidateForm = (updateErrors) => {
    let validFlag = true;
    for (let field in this.validators) {
      const error = this.onValidateInput(
        field,
        this.state[field].value,
        updateErrors
      );
      if (error) {
        validFlag = false;
      }
    }
    return validFlag;
  };

  handleSubmitTemplate = (callback) => async (event) => {
    event.preventDefault();

    const isValid = this.checkValidateForm();
    if (!isValid) {
      return;
    }

    try {
      await callback();
    } catch (error) {
      if (!error.code) {
        this.setState({
          formError: error.message,
        });
      } else {
        if (AUTH_ERROR_MESSAGES[error.code]) {
          this.setState({
            formError: AUTH_ERROR_MESSAGES[error.code],
          });
        } else {
          this.setState({
            formError: error.code.split('/')[1].split('-').join(' '),
          });
        }
      }
    }
  };
}

export default Form;
