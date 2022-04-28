import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import HiddenPost from './HiddenPost';

function PostFactory(props) {
  const [isHidden, setIsHidden] = useState(props.isHidden);
  return isHidden ? (
    <HiddenPost {...props} showPost={() => setIsHidden(false)} />
  ) : (
    <Post {...props} hidePost={() => setIsHidden(true)} />
  );
}

PostFactory.propTypes = {
  isHidden: PropTypes.bool,
  user: PropTypes.object,
  post: PropTypes.object,
};

export default React.memo(PostFactory);