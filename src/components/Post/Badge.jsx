import React from 'react';
import PropTypes from 'prop-types';

function Badge({ text }) {
  return (
    <div
      className='badge'
      style={{
        display: 'inline-block',
        padding: '0.25em 0.4em',
        fontSize: '75%',
        fontWeight: '700',
        lineHeight: '1',
        textAlign: 'center',
        whitespace: 'nowrap',
        verticalAlign: 'baseline',
        borderRadius: '0.25rem',
        backgroundColor: '#f8a81f',
        color: '#fff',
      }}>
      <p>{text}</p>
    </div>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};

export default React.memo(Badge);