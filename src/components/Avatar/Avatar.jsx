import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ imgUrl, style }) => (
  <div
    className='avatar'
    style={{
      backgroundImage: `url('${imgUrl}')`,
      backgroundColor: '#000000',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: '50%',
      ...style,
    }}
  />
);

Avatar.propTypes = {
  imgUrl: PropTypes.string,
};

export default React.memo(Avatar);
