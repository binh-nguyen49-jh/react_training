import React, { Component } from 'react';
import '../InputField/InputField.scss';
import './DropdownField.scss';
import PropTypes from 'prop-types';

class DropdownField extends Component {
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
    const { name, label, placeholder, options, className, error } = this.props;
    return (
      <div className='formInput select'>
        <select
          placeholder={placeholder}
          onBlur={this.validate}
          onChange={this.handleChange}
          name={name}
          id={name}
          className={className}>
          <option value={''}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
        <span className='formError'>{error}</span>
      </div>
    );
  };
}

DropdownField.propTypes = {
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

DropdownField.defaultProps = {
  placeholder: '',
  name: '',
  label: '',
  options: [],
  className: '',
};

export default React.memo(DropdownField);
