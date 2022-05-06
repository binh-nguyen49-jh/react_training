import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ imgUrl, style }) => (
  <div
    className='avatar'
    style={{
      backgroundImage: imgUrl ? `url('${imgUrl}')` : 'none',
      ...style,
    }}
  />
);

Avatar.propTypes = {
  imgUrl: PropTypes.string,
};

export default React.memo(Avatar);
