import React from 'react';
import { PropTypes } from 'prop-types';

function ImageItem({ content, className, description }) {
  return (
    <div
      className={`imageItem ${className}`}
      style={{
        backgroundImage: `url(${content})`,
      }}
    />
  );
}

ImageItem.propTypes = {
  content: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

ImageItem.defaultTypes = {
  content: '',
  description: '',
  className: '',
};

export default React.memo(ImageItem);
