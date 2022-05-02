import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostAPI from '../../API/postAPI';
import { useAuth } from '../../hooks/authentication';
import useInViewport from '../../hooks/useInViewport';
import PostFactory from '../Post/PostFactory';
import './PostList.scss';

function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    entryRef: lastSentinelRef,
    isIntersecting,
    observer,
  } = useInViewport();
  const isFirstRender = useRef(true);
  const { user } = useAuth();

  const getPosts = useCallback(async () => {
    if (user) {
      if (isLoading) return;
      setIsLoading(true);
      const newPosts = await PostAPI.getPosts(user.uid);
      if (newPosts.length === 0) return;
      setPosts((oldPosts) => [
        ...oldPosts,
        ...newPosts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
      ]);
      setIsLoading(false);
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getPosts();
    }
    return () => {
      // Reset cursor to the top of the database
      PostAPI.lastQueryPosition = null;
    };
  }, [getPosts]);

  return (
    <>
      <div
        className='postList'
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          gap: '3rem',
        }}>
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
      <div className={`infinite-load ${isLoading ? 'show' : ''}`}>
        <div className='spinner' />
        <p>Loading...</p>
      </div>
    </>
  );
}

export default PostList;
