import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './InputField.scss';

class InputField extends Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(this.props.name, event.target.value, '');
  };

  validate = () => {
    this.props.onValidate(this.props.name, this.state.value);
  };

  render = () => {
    const { type, name, label, placeholder, className } = this.props;
    return (
      <div className='formInput'>
        <input
          placeholder={placeholder}
          onBlur={this.validate}
          onChange={this.handleChange}
          type={type}
          name={name}
          id={name}
          value={this.state.value}
          className={className ? className : ''}
        />
        <label htmlFor={name}>{label}</label>
        <span className='inputError'>{this.props.error}</span>
      </div>
    );
  };
}

export default InputField;