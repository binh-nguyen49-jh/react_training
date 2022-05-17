import React from 'react';
import TextAreaField from '../TextAreaField/TextAreaField';
import { PropTypes } from 'prop-types';
import './BioField.scss';
function BioField(props) {
  const { onChange, error, label, ...childProps } = props;
  const { name } = childProps;
  const handleChange = (value) => {
    onChange(childProps.name, value, '');
  };

  return (
    <div className='formInput bioField'>
      <div className='bioContainer'>
        <TextAreaField onChange={handleChange} {...childProps} />
      </div>
      <label htmlFor={name}>{label}</label>
      <span className='inputError'>{error}</span>
    </div>
  );
}

BioField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

BioField.defaultProps = {
  className: '',
  onChange: () => {},
  defaultValue: '',
  error: '',
};

export default React.memo(BioField);
