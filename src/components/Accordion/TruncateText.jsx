import React from 'react';
import { PropTypes } from 'prop-types';
import { truncateText } from '../../utils/mathFuncs';

function TruncateText({ showFull, className, children, maxWords }) {
  return (
    <p className={className}>
      {showFull ? children : truncateText(children, maxWords)}
    </p>
  );
}

TruncateText.propTypes = {
  showFull: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  maxWords: PropTypes.number,
};

export default TruncateText;
