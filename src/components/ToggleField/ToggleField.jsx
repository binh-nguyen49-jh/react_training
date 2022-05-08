import React from 'react';

function ToggleField({ name, className, label, onChange, defaultValue }) {
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

export default ToggleField;
