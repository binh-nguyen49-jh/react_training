import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostAPI from '../../API/postAPI';
import { useAuth } from '../../hooks/authentication';
import useInViewport from '../../hooks/useInViewport';
import PostFactory from '../Post/PostFactory';
import { PropTypes } from 'prop-types';
import './PostList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../redux/posts';
import { ASYNC_STATUS } from '../../config/constants';

function PostList({ postAPI }) {
  const dispatch = useDispatch();
  const getPostsStatus = useSelector((state) => state.getPosts.status);
  const [posts, setPosts] = useState([]);
  const {
    entryRef: lastSentinelRef,
    isIntersecting,
    observer,
  } = useInViewport();
  const isFirstRender = useRef(true);
  const { user } = useAuth();

  const getPosts = useCallback(async () => {
    if (user) {
      if (getPostsStatus === ASYNC_STATUS.PENDING) return;
      const newPosts = await dispatch(
        getPostsAction({ postAPI, userId: user.uid })
      );
      if (newPosts.payload.length === 0) return;
      setPosts((oldPosts) => [...oldPosts, ...newPosts.payload]);
    }
  }, [user]);

  useEffect(() => {
    if (isIntersecting) {
      getPosts();
      // Just trigger loading posts on the first time the component is in viewport
      observer.disconnect();
    }
  }, [isIntersecting, observer, getPosts]);

  useEffect(() => {
    postAPI.lastQueryPosition = null;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getPosts();
    }
    return () => {
      // Reset cursor to the top of the database
      postAPI.lastQueryPosition = null;
    };
  }, [getPosts]);

  return (
    <>
      <div className='postList'>
        {posts.map((post, idx) =>
          idx === posts.length - 1 ? (
            <PostFactory
              ref={lastSentinelRef}
              key={post.id}
              post={post}
              owner={post.owner}
              isHidden={post.hidden}
            />
          ) : (
            <PostFactory
              key={post.id}
              post={post}
              owner={post.owner}
              isHidden={post.hidden}
            />
          )
        )}
      </div>
      <div
        className={`infinite-load ${
          getPostsStatus === ASYNC_STATUS.PENDING ? 'show' : ''
        }`}>
        <div className='spinner' />
        <p>Loading...</p>
      </div>
    </>
  );
}

PostList.propTypes = {
  postAPI: PropTypes.instanceOf(PostAPI),
};

PostList.defaultProps = {
  postAPI: new PostAPI(),
};

export default PostList;
