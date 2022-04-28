import React, { Component } from 'react';
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
    const newForm = this.state;
    newForm[field].value = value;
    newForm[field].error = errorMessage;
    this.setState(newForm);
    const isValidForm = !this.checkValidateForm();
    this.setState({
      isSubmittable: isValidForm,
    });
  };

  onValidateInput = (field, value) => {
    const error = this.validators[field](value);
    const newForm = this.state;
    newForm[field].error = error;
    this.setState(newForm);
    return error;
  };

  checkValidateForm = () => {
    let validFlag = true;
    for (let field in this.validators) {
      const error = this.onValidateInput(field, this.state[field].value);
      if (error) {
        validFlag = false;
      }
    }
    return validFlag;
  };

  handleSubmitTemplate = (callback) => (event) => {
    event.preventDefault();

    const isValid = this.checkValidateForm();
    if (!isValid) {
      return;
    }

    try {
      callback();
    } catch (error) {
      if (!error.code) {
        this.setState({
          formError: error.message,
        });
      } else {
        this.setState({
          formError: error.code.split('/')[1].split('-').join(' '),
        });
      }
    }
  };
}

export default Form;
