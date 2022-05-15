import { Component } from 'react';
import { AUTH_ERROR_MESSAGES } from '../../config/constants';
import { formatErrorCode } from '../../utils/firebaseUtils';
import './Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: null,
      isInvalidForm: true,
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
    this.setState(newForm, () => {
      const isValidInput =
        this.onValidateInput(field, value, true) === undefined;
      const isInvalidForm = !(this.checkValidateForm(false) && isValidInput);
      this.setState({
        isInvalidForm,
      });
    });
  };

  onValidateInput = (field, value, updateError = true) => {
    if (!this.validators[field]) {
      return;
    }

    const error = this.validators[field](value);
    if (updateError) {
      const newForm = {
        ...this.state,
        [field]: {
          value,
          error,
        },
      };
      this.setState(newForm);
    }
    return error;
  };

  checkValidateForm = (updateErrors = true) => {
    let validFlag = true;
    for (let field in this.validators) {
      const error = this.onValidateInput(
        field,
        this.state[field].value,
        updateErrors
      );
      if (error) {
        validFlag = false;
        if (!updateErrors) {
          break;
        }
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
        this.setState({
          formError:
            AUTH_ERROR_MESSAGES[error.code] || formatErrorCode(error.code),
        });
      }
    }
  };
}

export default Form;
