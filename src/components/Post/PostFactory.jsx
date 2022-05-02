import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import HiddenPost from './HiddenPost';
import { useAuth } from '../../hooks/authentication';
const PostFactory = forwardRef((props, ref) => {
  const { user } = useAuth();
  const [isHidden, setIsHidden] = useState(props.isHidden);
  return isHidden ? (
    <HiddenPost
      postRef={ref}
      {...props}
      user={user}
      showPost={() => setIsHidden(false)}
    />
  ) : (
    <Post
      postRef={ref}
      user={user}
      {...props}
      hidePost={() => setIsHidden(true)}
    />
  );
});

PostFactory.propTypes = {
  isHidden: PropTypes.bool,
  owner: PropTypes.object,
  post: PropTypes.object,
};

export default React.memo(PostFactory);
