import React from 'react';
import { PropTypes } from 'prop-types';

function TruncateHeight({ showFull, children, maxHeight, className }) {
  return (
    <div
      style={{
        maxHeight: showFull ? 'none' : maxHeight,
      }}
      className={className}>
      {children}
    </div>
  );
}

TruncateHeight.propTypes = {
  showFull: PropTypes.bool,
  children: PropTypes.node,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
};

export default TruncateHeight;
