import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import HiddenPost from './HiddenPost';
import { useAuth } from '../../hooks/authentication';
function PostFactory(props) {
  const { user } = useAuth();
  const [isHidden, setIsHidden] = useState(props.isHidden);
  return isHidden ? (
    <HiddenPost
      key={props.key}
      {...props}
      user={user}
      showPost={() => setIsHidden(false)}
    />
  ) : (
    <Post
      key={props.key}
      user={user}
      {...props}
      hidePost={() => setIsHidden(true)}
    />
  );
}

PostFactory.propTypes = {
  isHidden: PropTypes.bool,
  owner: PropTypes.object,
  post: PropTypes.object,
};

export default React.memo(PostFactory);
