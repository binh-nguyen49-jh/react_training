import React, { Component } from 'react';
import ForwardRef from '../../HOC/ForwardRef';
import InputField from '../InputField/InputField';
import './DropdownField.scss';
class DropdownField extends InputField {

  constructor (props) {
    super(props);
    this.state = {
      value : null,
      error: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
      error: ""
    });
    this.props.onChange(this.props.name, this.state.value, this.state.error);
  }

  validate = () => {
    this.setState({
      error: this.props.validate(this.state.value)
    });
  }

  render = () => {
    const {ref, 
      type,
      name,
      label,
      placeholder,
      options,
      className } = this.props;
      return (
        <div className = 'form__input select'>
          <select 
          ref={ref} 
          placeholder = {placeholder} 
          onBlur = {this.validate} 
          onChange = {this.handleChange} 
          type = {type} 
          name = {name} 
          id = {name}
          className = {className? className: ""} >
            {
              options.map(option => <option key = {option.value} value = {option.value}>{option.label}</option>)
            }
          </select>
          <label htmlFor = {name}>{label}</label>
          <span className = "form__error">{error}</span>
        </div>
      )
    
  }
}

export default ForwardRef(DropdownField);
