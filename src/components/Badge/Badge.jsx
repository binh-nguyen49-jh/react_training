import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

function Badge({ text, style }) {
  return (
    <div className='badge' style={style}>
      <p>{text}</p>
    </div>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default React.memo(Badge);
