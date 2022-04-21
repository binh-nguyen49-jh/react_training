import React, { Component } from 'react';
import ForwardRef from '../../HOC/ForwardRef';
import 'InputField.scss';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
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

  validate = (value) => {
    this.setState({
      error: this.props.validate(value)
    });
  }

  render = () => {
    const { ref,
      type,
      name,
      label,
      placeholder,
      className } = this.props;
    return (
      <div className='form__input'>
        <input
          ref={ref}
          placeholder={placeholder}
          onBlur={validate}
          onChange={handleChange}
          type={type}
          name={name}
          value={this.state.value}
          className={className? className:""} />
        <label htmlFor={name}>{label}</label>
        <span className="form__error">{error}</span>
      </div>
    )

  }
}

export default ForwardRef(InputField);