import React, { Component } from "react";
import "../InputField/InputField.scss";
import "./DropdownField.scss";
class DropdownField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(this.props.name, event.target.value, "");
  };

  validate = () => {
    this.props.onValidate(this.props.name, this.state.value);
  };

  render = () => {
    const { name, label, placeholder, options, className } = this.props;
    return (
      <div className="form__input select">
        <select
          placeholder={placeholder}
          onBlur={this.validate}
          onChange={this.handleChange}
          name={name}
          id={name}
          className={className ? className : ""}
        >
          <option value={''} checked>{this.props.placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
        <span className="form__error">{this.props.error}</span>
      </div>
    );
  };
}

export default React.memo(DropdownField);
