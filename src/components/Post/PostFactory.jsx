import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import HiddenPost from './HiddenPost';

function PostFactory(props) {
  const [isHidden, setIsHidden] = useState(props.isHidden);
  return isHidden ? (
    <HiddenPost
      key={props.key}
      {...props}
      showPost={() => setIsHidden(false)}
    />
  ) : (
    <Post key={props.key} {...props} hidePost={() => setIsHidden(true)} />
  );
}

PostFactory.propTypes = {
  isHidden: PropTypes.bool,
  user: PropTypes.object,
  post: PropTypes.object,
};

export default React.memo(PostFactory);
