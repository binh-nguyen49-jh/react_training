import React from 'react';
import '../InputField/InputField.scss';
import PropTypes from 'prop-types';

function ToggleField({ name, className, label, defaultValue, ...props }) {
  const onChange = (event) => {
    props.onChange(name, event.target.value, '');
  };
  return (
    <div className='formInput toggleField'>
      <input
        type='checkbox'
        name={name}
        id={name}
        onChange={onChange}
        defaultChecked={defaultValue}
        className={className}
      />
      <label htmlFor={name}>{label}</label>
      <div className='toggleField__slider'>
        <span className='circle' />
      </div>
    </div>
  );
}

ToggleField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
};

ToggleField.defaultProps = {
  className: '',
  onChange: () => {},
  defaultValue: false,
};

export default ToggleField;
